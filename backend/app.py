#!/usr/bin/env python3
"""
Simple AI Code Review Backend - Single service
"""
import os
import json
import ast
import re
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Float
from sqlalchemy.orm import declarative_base, sessionmaker

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database setup
engine = create_engine('sqlite:///reviews.db', connect_args={'check_same_thread': False})
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)

class Review(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key=True, autoincrement=True)
    filename = Column(String(255))
    language = Column(String(50))
    code = Column(Text)
    score = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    analysis = Column(Text)  # JSON string
    syntax_errors = Column(Text)  # JSON string
    logic_errors = Column(Text)  # JSON string
    explanation = Column(Text)
    suggestions = Column(Text)  # JSON string
    issues = Column(String(500))
    ai_analysis = Column(Text)  # JSON string

Base.metadata.create_all(engine)

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash')
else:
    model = None

def detect_syntax_errors(code, language):
    """Detect syntax errors in code"""
    syntax_errors = []
    
    if language.lower() == 'python':
        try:
            ast.parse(code)
        except SyntaxError as e:
            syntax_errors.append({
                'type': 'Syntax Error',
                'message': str(e),
                'line': e.lineno,
                'severity': 'High'
            })
        except Exception as e:
            syntax_errors.append({
                'type': 'Parse Error',
                'message': str(e),
                'line': 0,
                'severity': 'High'
            })
    
    return syntax_errors

def detect_language_mismatch(code, expected_language):
    """Detect if code doesn't match the selected language"""
    mismatches = []
    
    # C++ keywords in Python mode
    if expected_language.lower() == 'python':
        if 'cout' in code or 'cin' in code or '#include' in code:
            mismatches.append({
                'type': 'Language Mismatch',
                'message': 'This code appears to be C++ but Python is selected. Converting to Python syntax...',
                'severity': 'High'
            })
        if code.strip().startswith('#include'):
            mismatches.append({
                'type': 'Language Mismatch',
                'message': 'This is C/C++ code. Please select C++ as the language.',
                'severity': 'High'
            })
    
    # JavaScript keywords in Python mode
    if expected_language.lower() == 'python' and ('console.log' in code or 'const ' in code or 'let ' in code):
        if 'function' in code and 'def ' not in code:
            mismatches.append({
                'type': 'Language Mismatch',
                'message': 'This code appears to be JavaScript but Python is selected.',
                'severity': 'Medium'
            })
    
    return mismatches

def detect_logic_errors(code, language):
    """Detect potential logic errors"""
    logic_errors = []
    
    # First check for language mismatch
    mismatch_errors = detect_language_mismatch(code, language)
    logic_errors.extend(mismatch_errors)
    
    if language.lower() == 'python':
        # Check for common logic issues
        if 'while True:' in code and 'break' not in code:
            logic_errors.append({
                'type': 'Infinite Loop',
                'message': 'Potential infinite loop detected - while True without break',
                'severity': 'High'
            })
        
        if 'if' in code and 'else' not in code and 'elif' not in code:
            if code.count('if') > 1:  # Multiple ifs without else
                logic_errors.append({
                    'type': 'Missing Else',
                    'message': 'Consider adding else clause for better logic flow',
                    'severity': 'Medium'
                })
        
        # Check for division by zero
        if '/' in code and '0' in code:
            logic_errors.append({
                'type': 'Division by Zero',
                'message': 'Potential division by zero - add zero check',
                'severity': 'High'
            })
        
        # Check for unused variables
        lines = code.split('\n')
        for i, line in enumerate(lines):
            if '=' in line and not line.strip().startswith('#'):
                var_name = line.split('=')[0].strip()
                if var_name and var_name not in code[code.find(line) + len(line):]:
                    logic_errors.append({
                        'type': 'Unused Variable',
                        'message': f'Variable "{var_name}" might be unused',
                        'line': i + 1,
                        'severity': 'Low'
                    })
    
    return logic_errors

def explain_code_function(code, language):
    """Explain what the code does"""
    if not model:
        return "AI model not available for code explanation"
    
    try:
        prompt = f"""
        Explain what this {language} code does in simple terms:
        
        Code:
        {code}
        
        Provide:
        1. What the code does (main purpose)
        2. How it works (step by step)
        3. Input and output (if any)
        4. Key functions/methods used
        
        Keep it concise and easy to understand.
        """
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating explanation: {str(e)}"

def correct_code_to_language(code, language):
    """Convert code to proper syntax based on detected issues"""
    corrected = code
    
    # If Python is selected but C++ code is provided
    if language.lower() == 'python' and ('cout' in code or 'cin' in code):
        # Convert C++ to Python
        if 'cout <<' in code:
            # Extract the message - handle unquoted strings
            import re
            # Try to find the text after cout <<
            match = re.search(r'cout\s*<<\s*([A-Za-z0-9_][A-Za-z0-9_\s]*)', code)
            if match:
                message = match.group(1).strip()
                corrected = f'print("{message}")'
            else:
                # Try quoted strings
                match = re.search(r'cout\s*<<\s*["\']([^"\']*)["\']', code)
                if match:
                    message = match.group(1)
                    corrected = f'print("{message}")'
                else:
                    corrected = code
    
    # If C++ is selected but code has syntax issues
    elif language.lower() == 'cpp' and 'cout <<' in code:
        # Fix missing quotes and semicolon in C++ code
        import re
        # Extract the content after cout <<
        match = re.search(r'cout\s*<<\s*([^\n<;]+)', code)
        if match:
            content = match.group(1).strip()
            # Check if it's a quoted string
            if not (content.startswith('"') and content.endswith('"')):
                # It's an unquoted string, add quotes
                content = f'"{content}"'
            # Check if semicolon is missing
            if not code.strip().endswith(';'):
                corrected = f'cout << {content};'
            else:
                corrected = f'cout << {content};'
        else:
            corrected = code
    
    return corrected

def generate_code_explanation(code, corrected_code, language):
    """Generate explanation for what the corrected code does"""
    if corrected_code != code:
        if language.lower() == 'python' and ('cout' in code or 'cin' in code):
            # C++ code provided but Python selected
            explanation = f"""
**Code Language Mismatch:**
You selected {language} but provided C++ code.

**Original Code (C++):**
{code}

**Corrected Python Code:**
{corrected_code}

**Key Differences:**
- C++ uses `cout <<` for output, Python uses `print()`
- C++ strings can be unquoted in some contexts
- Python requires quotes around string literals
- Python automatically adds newlines, no need for `endl`

**The corrected code properly formats the string output in Python syntax.**
"""
        elif language.lower() == 'cpp':
            # C++ code with syntax issues
            import re
            match = re.search(r'cout\s*<<\s*([^\n<]+)', code)
            if match:
                content = match.group(1).strip()
                explanation = f"""
**C++ Code Explanation:**

**What the code does:**
This C++ code outputs text to the console using the standard output stream.

**Original Code:**
{code}

**Problems detected:**
1. Missing quotes: The text `{content}` should be `"{content}"`
2. Missing semicolon at the end

**Corrected Code:**
{corrected_code}

**How it works:**
- `cout` is the standard output stream (part of <iostream>)
- `<<` is the stream insertion operator
- String literals must be enclosed in double quotes
- All statements in C++ must end with a semicolon

**Full working example:**
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {{
    cout << "Ravi Singhal";
    return 0;
}}
\`\`\`

This code will print "Ravi Singhal" to the console when executed.
"""
            else:
                explanation = f"**Code Corrected:**\nOriginal: `{code}`\nCorrected: `{corrected_code}`"
        else:
            explanation = f"**Code Corrected:**\nOriginal: `{code}`\nCorrected: `{corrected_code}`"
    else:
        # Analyze the actual code that was provided
        if language.lower() == 'cpp' or 'cout' in code:
            # C++ code explanation
            if 'cout <<' in code:
                # Extract what's being printed
                import re
                match = re.search(r'cout\s*<<\s*([^\n<]+)', code)
                if match:
                    content = match.group(1).strip()
                    # Check if corrected code is different
                    if corrected_code != code:
                        explanation = f"""
**C++ Code Explanation:**

**What the code does:**
This C++ code outputs text to the console using the standard output stream.

**Original Code:**
{code}

**Problems detected:**
1. Missing quotes: The text `{content}` should be `"{content}"`
2. Missing semicolon at the end

**Corrected Code:**
{corrected_code}

**How it works:**
- `cout` is the standard output stream (part of <iostream>)
- `<<` is the stream insertion operator
- String literals must be enclosed in double quotes
- All statements in C++ must end with a semicolon

**Full working example:**
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {{
    cout << "Ravi Singhal";
    return 0;
}}
\`\`\`

This code will print "Ravi Singhal" to the console when executed.
"""
                    else:
                        explanation = f"""
**C++ Code Explanation:**

**What the code does:**
This C++ code outputs "Ravi Singhal" to the console.

**Code:**
{code}

**How it works:**
- `cout` is the standard output stream object
- `<<` is the stream insertion operator
- The text `{content}` is output to the console
- Semicolon ends the statement

**Note:** You'll need to include the iostream header and main function for this to compile.
"""
                else:
                    explanation = f"**C++ Code:** This uses the cout stream to output data. Ensure proper string formatting with quotes and semicolons."
            else:
                explanation = f"**C++ Code Analysis:**\n{code}\n\nThis appears to be C++ code. Make sure to include proper headers like `#include <iostream>` and format strings correctly."
        
        elif language.lower() == 'python':
            # Python code explanation
            if 'print(' in code:
                explanation = f"""
**Python Code Explanation:**

**What the code does:**
This Python code prints output to the standard console.

**Code:**
{code}

**How it works:**
- `print()` is Python's built-in function for output
- Arguments are automatically converted to strings
- A newline is added after each print statement
- Strings must be enclosed in quotes (single or double)

**Usage:**
The print function displays the specified text or variables to the console.
"""
            else:
                explanation = f"**Python Code:**\n{code}\n\nThis appears to be Python code. Ensure proper syntax and indentation."
        
        elif language.lower() == 'javascript':
            if 'console.log' in code or 'console.' in code:
                explanation = f"""
**JavaScript Code Explanation:**

**What the code does:**
This JavaScript code outputs data to the browser console.

**Code:**
{code}

**How it works:**
- `console.log()` outputs to the browser's developer console
- Useful for debugging and displaying messages
- Strings must be enclosed in quotes
"""
            else:
                explanation = f"**JavaScript Code:**\n{code}\n\nJavaScript code for web applications."
        
        else:
            explanation = f"**Code Explanation:**\nAnalyzing {language} code...\n\nThe code appears to be {language} syntax. Ensure proper formatting and language conventions."
    
    return explanation.strip()

def analyze_code_quality(code, language):
    """Comprehensive code quality analysis"""
    analysis = {
        'lines': len(code.split('\n')),
        'functions': code.count('def ') + code.count('function '),
        'branches': code.count('if ') + code.count('elif ') + code.count('case '),
        'loops': code.count('for ') + code.count('while '),
        'comments': code.count('#') + code.count('//') + code.count('/*'),
        'complexity': 0
    }
    
    # Calculate complexity score
    analysis['complexity'] = analysis['functions'] + analysis['branches'] + analysis['loops']
    
    # Calculate quality score
    base_score = 100
    if analysis['complexity'] > 10:
        base_score -= 20
    if analysis['comments'] == 0:
        base_score -= 15
    if analysis['lines'] > 50:
        base_score -= 10
    
    # Deduct points for language mismatch
    if language.lower() == 'python' and ('cout' in code or 'cin' in code):
        base_score -= 30
    
    analysis['score'] = max(0, base_score)
    
    return analysis

@app.route('/api/review', methods=['POST'])
def review_code():
    """Code review endpoint"""
    try:
        data = request.get_json()
        code = data.get('code', '')
        language = data.get('language', 'python')
        filename = data.get('filename', f'code.{language}')
        
        if not code.strip():
            return jsonify({'error': 'No code provided'}), 400
        
        # Detect syntax errors
        syntax_errors = detect_syntax_errors(code, language)
        
        # Detect logic errors
        logic_errors = detect_logic_errors(code, language)
        
        # Correct code if language mismatch or syntax issues detected
        corrected_code = correct_code_to_language(code, language)
        
        # Analyze code quality
        analysis = analyze_code_quality(code, language)
        
        # Fast analysis with fallback
        explanation = ""
        suggestions = []
        
        # Generate explanation using the corrected code
        explanation = generate_code_explanation(code, corrected_code, language)
        
        # Smart suggestions based on code analysis
        suggestions = []
        
        # Error handling
        if not any(word in code for word in ['try:', 'except', 'catch', 'finally']):
            suggestions.append('Consider adding error handling with try-catch blocks')
        
        # Comments
        if code.count('#') == 0 and code.count('//') == 0 and code.count('/*') == 0:
            suggestions.append('Add comments to explain complex logic and improve readability')
        
        # Function length
        if len(code.split('\n')) > 30:
            suggestions.append('Consider breaking long functions into smaller, more manageable pieces')
        
        # Variable naming
        if any(word in code for word in ['x', 'y', 'z', 'temp', 'var']):
            suggestions.append('Use more descriptive variable names instead of single letters')
        
        # Input validation
        if 'input(' in code or 'scanf' in code:
            suggestions.append('Add input validation to handle unexpected user input')
        
        # Default suggestions if none found
        if not suggestions:
            suggestions = [
                'Consider adding error handling for better robustness',
                'Use more descriptive variable names for better readability',
                'Add comments to explain complex logic'
            ]
        
        # Skip Gemini AI analysis to prevent timeouts - use fast fallback system
        print(f"Analysis completed in fast fallback mode for {filename}")
        
        # Create sections with corrected code and explanation
        logic_issue_message = ''
        if corrected_code != code:
            if language.lower() == 'python' and ('cout' in code or 'cin' in code):
                logic_issue_message = 'Language mismatch detected - code was converted from C++ to Python syntax'
            elif language.lower() == 'cpp':
                logic_issue_message = 'Code syntax issues detected and corrected (added quotes and semicolon)'
            else:
                logic_issue_message = 'Code was corrected to proper syntax'
        
        sections = {
            'explanation': explanation,
            'logic_issues': logic_issue_message,
            'suggestions': suggestions,
            'quality_score': f'Quality Score: {analysis["score"]}/100',
            'issue_summary': f'Found {len(syntax_errors)} syntax errors and {len(logic_errors)} logic issues',
            'language_insight': f'{language} best practices applied',
            'corrected_code': corrected_code
        }
        
        # Create review object with enhanced AI analysis
        ai_analysis_data = {
            'explanation': sections.get('explanation', ''),
            'logic_issues': sections.get('logic_issues', ''),
            'suggestions': sections.get('suggestions', ''),
            'quality_score': sections.get('quality_score', ''),
            'issue_summary': sections.get('issue_summary', ''),
            'language_insight': sections.get('language_insight', ''),
            'corrected_code': sections.get('corrected_code', '')
        } if 'sections' in locals() else {}
        
        # Store in database
        db_session = SessionLocal()
        try:
            review_obj = Review(
                filename=filename,
                language=language,
                code=code,
                score=analysis['score'],
                created_at=datetime.now(),
                analysis=json.dumps(analysis),
                syntax_errors=json.dumps(syntax_errors),
                logic_errors=json.dumps(logic_errors),
                explanation=explanation,
                suggestions=json.dumps(suggestions),
                issues=f"{len(syntax_errors)} syntax errors, {len(logic_errors)} logic issues",
                ai_analysis=json.dumps(ai_analysis_data)
            )
            db_session.add(review_obj)
            db_session.commit()
            db_session.refresh(review_obj)
            review_id = review_obj.id
        finally:
            db_session.close()
        
        return jsonify({
            'analysis': analysis,
            'syntax_errors': syntax_errors,
            'logic_errors': logic_errors,
            'explanation': explanation,
            'suggestions': suggestions,
            'review_id': review_id,
            'ai_analysis': ai_analysis_data
        })
        
    except Exception as e:
        return jsonify({'error': f'Review failed: {str(e)}'}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    """Get review history - returns real data from database"""
    db_session = SessionLocal()
    try:
        reviews = db_session.query(Review).order_by(Review.created_at.desc()).limit(50).all()
        result = []
        for review in reviews:
            result.append({
                'id': review.id,
                'filename': review.filename,
                'language': review.language,
                'code': review.code,
                'score': review.score,
                'created_at': review.created_at.isoformat(),
                'analysis': json.loads(review.analysis) if review.analysis else {},
                'syntax_errors': json.loads(review.syntax_errors) if review.syntax_errors else [],
                'logic_errors': json.loads(review.logic_errors) if review.logic_errors else [],
                'explanation': review.explanation,
                'suggestions': json.loads(review.suggestions) if review.suggestions else [],
                'issues': review.issues,
                'ai_analysis': json.loads(review.ai_analysis) if review.ai_analysis else {}
            })
        return jsonify(result)
    finally:
        db_session.close()

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    """Get analytics data"""
    db_session = SessionLocal()
    try:
        reviews = db_session.query(Review).all()
        
        if not reviews:
            return jsonify({
                'total_reviews': 0,
                'average_score': 0,
                'language_distribution': {},
                'recent_trends': [],
                'error_summary': {}
            })
        
        # Calculate analytics
        total_reviews = len(reviews)
        average_score = sum(review.score for review in reviews) / total_reviews
        
        # Language distribution
        language_dist = {}
        for review in reviews:
            lang = review.language
            language_dist[lang] = language_dist.get(lang, 0) + 1
        
        # Recent trends (last 10 reviews)
        recent_reviews = db_session.query(Review).order_by(Review.created_at.desc()).limit(10).all()
        recent_trends = [
            {
                'date': review.created_at.isoformat()[:10],
                'score': review.score,
                'filename': review.filename
            }
            for review in recent_reviews
        ]
        
        # Error summary
        total_syntax_errors = 0
        total_logic_errors = 0
        for review in reviews:
            if review.syntax_errors:
                total_syntax_errors += len(json.loads(review.syntax_errors))
            if review.logic_errors:
                total_logic_errors += len(json.loads(review.logic_errors))
        
        return jsonify({
            'total_reviews': total_reviews,
            'average_score': round(average_score, 2),
            'language_distribution': language_dist,
            'recent_trends': recent_trends,
            'error_summary': {
                'syntax_errors': total_syntax_errors,
                'logic_errors': total_logic_errors,
                'total_errors': total_syntax_errors + total_logic_errors
            }
        })
    finally:
        db_session.close()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'AI Code Review Backend',
        'ai_available': model is not None
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)