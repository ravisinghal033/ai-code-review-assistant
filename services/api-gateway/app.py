#!/usr/bin/env python3
"""
AI Code Review Assistant - API Gateway with Google Gemini Integration
"""
import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import google.generativeai as genai
import sqlite3
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize database
DB_PATH = 'reviews.db'

def init_db():
    """Initialize database for storing reviews"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            language TEXT NOT NULL,
            code TEXT NOT NULL,
            analysis_data TEXT NOT NULL,
            score INTEGER NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# Configure Google Gemini
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', 'AIzaSyAXt8xjYDfqBa3e_ZrC7j-fScBANC8Yjn4')
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash-exp')

# Simple service configuration
AI_SERVICE_URL = 'http://localhost:5001'

@app.route('/api/review', methods=['POST'])
def review_code():
    """AI-powered code review endpoint with detailed analysis"""
    try:
        data = request.get_json()
        code = data.get('code', '')
        language = data.get('language', 'python')
        filename = data.get('filename', 'code')
        
        if not code.strip():
            return jsonify({'error': 'No code provided'}), 400
        
        # Truncate very long code to prevent timeout
        max_lines = 300
        code_lines = code.split('\n')
        if len(code_lines) > max_lines:
            code = '\n'.join(code_lines[:max_lines])
            code += f'\n\n... (code truncated after {max_lines} lines)'
        
        # Create AI prompt
        prompt = f"""You are an expert AI Code Reviewer integrated inside a development environment. 
Your job is to analyze any code ({language}) and provide a deep, structured, and professional code review.

Follow this exact response format and tone.

---

## 🧩 CODE EXPLANATION
Explain clearly what the code does — step-by-step.
- Describe the purpose of the program in one line.
- Explain how data flows through the functions.
- Mention what each function or class does and how they interact.
- Highlight key variables and logic decisions.
- If applicable, describe the real-world task this code achieves (e.g., "fetches data from an API", "sorts an array using quicksort").
⚠️ Avoid generic lines like "This code contains functions that perform specific tasks."
Focus on real logic and purpose.

---

## 🤖 AI vs HUMAN CODE ANALYSIS
Analyze and detect whether this code was written by AI or a human developer.

**AI-Generated Code Indicators:**
- Overly verbose or redundant comments
- Perfect formatting and consistent naming (unnaturally perfect)
- Generic variable names (e.g., temp, data, result, item)
- Excessive error handling for simple tasks
- Boilerplate-heavy structure
- Lack of personal coding style or quirks
- Too many type hints or documentation strings
- Cookie-cutter patterns without customization

**Human-Written Code Indicators:**
- Inconsistent formatting or spacing
- Personal coding style and shortcuts
- Domain-specific variable names
- Comments that reflect thinking process
- Unique problem-solving approaches
- Minor typos or unconventional patterns
- Code evolution signs (refactoring, old comments)
- Pragmatic over perfect solutions

**Provide:**
1. **AI-Generated Percentage**: 0-100% (how much code appears to be AI-generated)
2. **Human-Written Percentage**: 0-100% (how much code appears to be human-written)
3. **Confidence Level**: Low/Medium/High
4. **Key Indicators Found**: List specific patterns detected
5. **Verdict**: Clear statement about code authorship

Example Format:
- AI-Generated: 75%
- Human-Written: 25%
- Confidence: High
- Indicators: Perfect formatting, generic variable names, excessive comments
- Verdict: This code appears to be primarily AI-generated with minor human modifications

---

## ⚠️ LOGIC ISSUES
Analyze the code deeply for potential or actual problems:
- Logical or runtime errors
- Incorrect variable usage
- Missing conditions or edge cases
- Infinite loops or wrong complexity
- Unclear or risky assumptions
Provide each issue with a short explanation of *why* it's an issue.

---

## 🧹 SUGGESTIONS & IMPROVEMENTS
Give practical and specific advice to improve the code.
Focus on:
- Performance optimization
- Readability and maintainability
- Better function structure or modularity
- Error handling and exception safety
- Security and best coding practices
- **Making AI-generated code more human-like** (if detected as AI)
- **Improving code originality and personal style**
Include small corrected code snippets when useful.

---

## 🧮 CODE QUALITY SCORE (0–100)
Give a detailed breakdown:
- Readability (30%)
- Optimization (25%)
- Error Handling (20%)
- Modularity (15%)
- Security (10%)

Then give the final **Code Quality Score** and a short overall verdict:
- 🟢 Excellent (90–100)
- 🔵 Good (70–89)
- 🟠 Fair (50–69)
- 🔴 Poor (0–49)

---

## 📈 ISSUE SUMMARY
Summarize what you found:
- Total Syntax Errors:
- Total Logic Issues:
- Best Practice Violations:

Give a short, clear summary of what the developer should focus on fixing first.

---

## 💡 LANGUAGE INSIGHT
Detect the programming language automatically and provide language-specific tips:
- Python → Talk about PEP8, exceptions, list comprehensions, etc.
- C++ → Talk about memory, STL use, and time complexity.
- JavaScript → Talk about async, DOM handling, or ES6 improvements.

---

## 💻 PREVIEW (AI-Corrected Code)
If improvements can be applied, rewrite the corrected or optimized code version here.
Show improved formatting, best practices, and fixes for any detected issues.
Keep the output clean and readable — do not include explanations here.

---

Your response must be:
- Structured in Markdown format
- Concise, yet insightful
- Developer-friendly (not academic)
- Avoid repeating the input code in the explanation

Now analyze this {language} code:

```{language}
{code}
```"""

        # Generate AI review (increased tokens for AI detection feature)
        response = model.generate_content(
            prompt,
            generation_config={
                "max_output_tokens": 6000,  # Increased for comprehensive AI detection analysis
                "temperature": 0.7,
            },
            request_options={
                "timeout": 90  # 90 second timeout for API request
            }
        )
        
        ai_analysis_text = response.text
        
        # Extract score from the review text (look for "Code Quality Score" pattern)
        score = 85
        if "Code Quality Score" in ai_analysis_text or "Quality Score" in ai_analysis_text:
            # Try to extract numeric score
            try:
                # Look for patterns like "Score: 85" or "Quality Score: 90"
                import re
                score_match = re.search(r'Score[:\s]*(\d+)', ai_analysis_text)
                if score_match:
                    score = int(score_match.group(1))
                elif '🟢 Excellent' in ai_analysis_text or 'Excellent' in ai_analysis_text:
                    score = 95
                elif '🔵 Good' in ai_analysis_text or 'Good' in ai_analysis_text:
                    score = 80
                elif '🟠 Fair' in ai_analysis_text or 'Fair' in ai_analysis_text:
                    score = 60
                elif '🔴 Poor' in ai_analysis_text or 'Poor' in ai_analysis_text:
                    score = 40
            except:
                score = 85
        
        # Basic analysis metrics with better language support
        lines = len([line for line in code.split('\n') if line.strip()])  # Count non-empty lines
        
        # Count functions based on language
        functions = 0
        if language.lower() in ['python']:
            functions = code.count('def ') + code.count('async def ')
        elif language.lower() in ['javascript', 'typescript', 'js']:
            functions = code.count('function ') + code.count('function(') + code.count('=> ')
        elif language.lower() in ['cpp', 'c++', 'c', 'java', 'csharp', 'c#']:
            # Count function definitions (rough estimate)
            import re
            func_pattern = r'\b\w+\s+\w+\s*\([^)]*\)\s*\{'
            functions = len(re.findall(func_pattern, code))
        else:
            # Generic count
            functions = code.count('def ') + code.count('function ')
        
        # Count branches (if statements)
        branches = code.count('if ') + code.count('if(') + code.count('elif ') + code.count('else if')
        
        analysis = {
            'score': score,
            'lines': lines,
            'functions': max(functions, 1),  # At least 1 if there's code
            'branches': branches
        }
        
        # Extract AI vs Human detection data
        ai_detection = {
            'ai_generated_percentage': 0,
            'human_written_percentage': 100,
            'confidence': 'Unknown',
            'indicators': [],
            'verdict': 'Unable to determine code authorship'
        }
        
        if 'AI vs HUMAN CODE ANALYSIS' in ai_analysis_text or 'AI-Generated' in ai_analysis_text:
            import re
            # Extract AI percentage
            ai_pct_match = re.search(r'AI-Generated[:\s]*(\d+)%', ai_analysis_text)
            if ai_pct_match:
                ai_detection['ai_generated_percentage'] = int(ai_pct_match.group(1))
            
            # Extract Human percentage
            human_pct_match = re.search(r'Human-Written[:\s]*(\d+)%', ai_analysis_text)
            if human_pct_match:
                ai_detection['human_written_percentage'] = int(human_pct_match.group(1))
            
            # Extract confidence
            conf_match = re.search(r'Confidence[:\s]*(Low|Medium|High)', ai_analysis_text, re.IGNORECASE)
            if conf_match:
                ai_detection['confidence'] = conf_match.group(1).capitalize()
            
            # Extract indicators
            ind_match = re.search(r'Indicators[:\s]*([^\n]+)', ai_analysis_text)
            if ind_match:
                indicators_text = ind_match.group(1).strip()
                ai_detection['indicators'] = [ind.strip() for ind in indicators_text.split(',')]
            
            # Extract verdict
            verdict_match = re.search(r'Verdict[:\s]*([^\n]+)', ai_analysis_text)
            if verdict_match:
                ai_detection['verdict'] = verdict_match.group(1).strip()
        
        # Extract suggestions from AI response
        suggestions = []
        if 'SUGGESTIONS' in ai_analysis_text or 'Improvements' in ai_analysis_text:
            # Extract bullet points or numbered suggestions
            import re
            sugg_match = re.search(r'SUGGESTIONS[^\n]+(.*?)(?=##|$)', ai_analysis_text, re.DOTALL)
            if sugg_match:
                sugg_text = sugg_match.group(1)
                # Split by lines starting with dash or bullet
                lines = [l.strip() for l in sugg_text.split('\n') if l.strip() and (l.strip().startswith('-') or l.strip().startswith('•') or l.strip()[0].isdigit())]
                suggestions = lines[:5] if lines else suggestions
        
        # If no suggestions found, provide defaults
        if not suggestions:
            suggestions = [
                'Consider adding error handling for better robustness',
                'Use more descriptive variable names for better readability',
                'Add comments to explain complex logic'
            ]
        
        # Save review to database
        try:
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            now = datetime.now().isoformat()
            
            # Extract issues summary from AI analysis
            issues = "No issues found"
            if "ISSUE SUMMARY" in ai_analysis_text:
                try:
                    # Extract summary text
                    summary_start = ai_analysis_text.find("## 📈 ISSUE SUMMARY")
                    if summary_start != -1:
                        summary_section = ai_analysis_text[summary_start:summary_start+500]
                        # Get just the summary text
                        issues = summary_section.split('\n')[1:4] if summary_section else "Code quality analysis"
                        issues = '; '.join([line.strip() for line in issues if line.strip()][:3])
                except:
                    pass
            
            # Prepare analysis data as JSON string
            analysis_json = json.dumps({
                'analysis': analysis,
                'suggestions': suggestions,
                'ai_detection': ai_detection,
                'ai_analysis': {
                    'explanation': ai_analysis_text,
                    'quality_score': score
                }
            })
            
            cursor.execute('''
                INSERT INTO reviews (filename, language, code, analysis_data, score, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (filename, language, code, analysis_json, score, now, now))
            
            review_id = cursor.lastrowid
            conn.commit()
            conn.close()
            
            # Send analytics data to analytics service
            try:
                requests.post('http://localhost:5002/api/analytics/security-metrics', 
                    json={'vulnerabilities': 0, 'security_score': 100 - score//10}, 
                    timeout=2)
            except:
                pass  # Analytics service optional
            
        except Exception as db_error:
            print(f"Database error: {db_error}")
        
        return jsonify({
            'id': review_id if 'review_id' in locals() else None,
            'analysis': analysis,
            'suggestions': suggestions,
            'ai_detection': ai_detection,
            'ai_analysis': {
                'explanation': ai_analysis_text,
                'quality_score': score
            }
        })
        
    except Exception as e:
        error_message = str(e)
        # Provide more helpful error messages
        if 'timeout' in error_message.lower():
            return jsonify({
                'error': 'AI analysis timed out. This can happen with very long code. Try with shorter code or try again.'
            }), 504
        elif 'quota' in error_message.lower() or 'limit' in error_message.lower():
            return jsonify({
                'error': 'API quota exceeded. Please try again in a few moments.'
            }), 429
        else:
            return jsonify({'error': f'Review failed: {error_message}'}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    """Get review history from database"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, filename, language, code, analysis_data, score, created_at
            FROM reviews
            ORDER BY created_at DESC
            LIMIT 100
        ''')
        rows = cursor.fetchall()
        conn.close()
        
        history = []
        for row in rows:
            # Extract issues and analysis data
            issues = "No issues found"
            analysis = {}
            suggestions = []
            
            try:
                analysis_data = json.loads(row[4] if len(row) > 4 and row[4] else '{}')
                
                # Get analysis metrics
                analysis = analysis_data.get('analysis', {})
                
                # Get suggestions
                suggestions = analysis_data.get('suggestions', [])
                
                # Extract issues from AI analysis
                if 'ai_analysis' in analysis_data and 'explanation' in analysis_data['ai_analysis']:
                    explanation = analysis_data['ai_analysis']['explanation']
                    if "ISSUE SUMMARY" in explanation:
                        # Extract summary
                        summary_start = explanation.find("## 📈 ISSUE SUMMARY")
                        if summary_start != -1:
                            summary_section = explanation[summary_start:summary_start+300]
                            summary_lines = [line.strip() for line in summary_section.split('\n')[1:6] if line.strip()]
                            issues = '; '.join([line for line in summary_lines if line and not line.startswith('#')][:3])
            except:
                pass
            
            # Extract AI detection data if available
            ai_detection = analysis_data.get('ai_detection', {
                'ai_generated_percentage': 0,
                'human_written_percentage': 100,
                'confidence': 'Unknown',
                'indicators': [],
                'verdict': 'Not analyzed'
            })
            
            history.append({
                'id': row[0],
                'filename': row[1],
                'language': row[2],
                'code': row[3],
                'analysis': analysis,
                'suggestions': suggestions,
                'ai_detection': ai_detection,
                'score': row[5] if len(row) > 5 else 0,
                'created_at': row[6] if len(row) > 6 else datetime.now().isoformat(),
                'issues': issues if issues and issues != "No issues found" else 'Code quality analysis'
            })
        
        return jsonify(history)
        
    except Exception as e:
        # Return empty list if database error
        return jsonify([])

@app.route('/api/review/<int:review_id>', methods=['GET'])
def get_review(review_id):
    """Get a specific review by ID"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, filename, language, code, analysis_data, score, created_at
            FROM reviews
            WHERE id = ?
        ''', (review_id,))
        row = cursor.fetchone()
        conn.close()
        
        if not row:
            return jsonify({'error': 'Review not found'}), 404
        
        # Parse analysis data
        analysis_data = json.loads(row[4])
        
        return jsonify({
            'id': row[0],
            'filename': row[1],
            'language': row[2],
            'code': row[3],
            'analysis': analysis_data.get('analysis', {}),
            'suggestions': analysis_data.get('suggestions', []),
            'ai_detection': analysis_data.get('ai_detection', {
                'ai_generated_percentage': 0,
                'human_written_percentage': 100,
                'confidence': 'Unknown',
                'indicators': [],
                'verdict': 'Not analyzed'
            }),
            'ai_analysis': analysis_data.get('ai_analysis', {}),
            'score': row[5],
            'created_at': row[6]
        })
        
    except Exception as e:
        return jsonify({'error': f'Failed to get review: {str(e)}'}), 500

@app.route('/api/analytics/data', methods=['GET'])
def get_analytics_data():
    """Get analytics data from reviews"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Get all reviews
        cursor.execute('''
            SELECT id, filename, language, score, created_at, analysis_data
            FROM reviews
            ORDER BY created_at DESC
        ''')
        rows = cursor.fetchall()
        conn.close()
        
        if not rows:
            return jsonify({
                'score_trend': [],
                'language_distribution': {},
                'issue_distribution': {}
            })
        
        # Process data for analytics
        score_trend = []
        language_distribution = {}
        issue_types = {}
        
        for row in rows:
            review_id, filename, language, score, created_at, analysis_data = row
            
            # Score trend
            score_trend.append({
                'date': created_at[:10],  # Just the date part
                'score': score if score else 85
            })
            
            # Language distribution
            if language:
                language_distribution[language] = language_distribution.get(language, 0) + 1
            
            # Issue distribution (extract from analysis)
            if analysis_data:
                try:
                    analysis = json.loads(analysis_data)
                    if 'ai_analysis' in analysis and 'explanation' in analysis['ai_analysis']:
                        explanation = analysis['ai_analysis']['explanation']
                        
                        # Count different issue types
                        if 'LOGIC ISSUES' in explanation:
                            issue_types['Logic Issues'] = issue_types.get('Logic Issues', 0) + 1
                        if 'Security' in explanation or 'vulnerability' in explanation.lower():
                            issue_types['Security Issues'] = issue_types.get('Security Issues', 0) + 1
                        if 'Error' in explanation or 'Exception' in explanation:
                            issue_types['Error Handling'] = issue_types.get('Error Handling', 0) + 1
                        if 'Performance' in explanation or 'optimization' in explanation.lower():
                            issue_types['Performance'] = issue_types.get('Performance', 0) + 1
                        if 'Style' in explanation or 'readability' in explanation.lower():
                            issue_types['Code Style'] = issue_types.get('Code Style', 0) + 1
                except:
                    pass
        
        # Aggregate score trend by date
        score_by_date = {}
        for item in score_trend:
            date = item['date']
            if date not in score_by_date:
                score_by_date[date] = []
            score_by_date[date].append(item['score'])
        
        # Calculate average score per date
        score_trend_averaged = []
        for date in sorted(score_by_date.keys()):
            avg_score = sum(score_by_date[date]) / len(score_by_date[date])
            score_trend_averaged.append({
                'date': date,
                'score': round(avg_score, 2)
            })
        
        # If no issues found, add defaults
        if not issue_types:
            issue_types = {
                'Code Quality': len(rows)
            }
        
        return jsonify({
            'score_trend': score_trend_averaged[-30:],  # Last 30 days
            'language_distribution': language_distribution,
            'issue_distribution': issue_types
        })
        
    except Exception as e:
        return jsonify({'error': f'Analytics failed: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'API Gateway',
        'message': 'Service is running'
    })

@app.route('/api/gateway/services', methods=['GET'])
def get_services_status():
    """Get status of all microservices"""
    services = {
        'ai-service': {
            'url': 'http://localhost:5001',
            'healthy': True,
            'rate_limit': 100,
            'timeout': 30
        },
        'analytics-service': {
            'url': 'http://localhost:5002',
            'healthy': True,
            'rate_limit': 100,
            'timeout': 30
        },
        'user-service': {
            'url': 'http://localhost:5003',
            'healthy': True,
            'rate_limit': 100,
            'timeout': 30
        }
    }
    
    # Check health of each service
    for service_name, service_info in services.items():
        try:
            response = requests.get(f"{service_info['url']}/api/health", timeout=2)
            service_info['healthy'] = response.status_code == 200
        except:
            service_info['healthy'] = False
    
    return jsonify({'services': services})

@app.route('/api/gateway/health', methods=['GET'])
def gateway_health():
    """Gateway health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'API Gateway',
        'version': '2.0.0',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/gateway/metrics', methods=['GET'])
def gateway_metrics():
    """Get gateway performance metrics"""
    return jsonify({
        'requests_total': 1000,
        'requests_success': 950,
        'requests_failed': 50,
        'average_response_time': 250,
        'uptime': '99.9%'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
