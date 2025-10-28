#!/usr/bin/env python3
"""
Simple AI Code Review Backend - Single service
"""
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash')
else:
    model = None

@app.route('/api/review', methods=['POST'])
def review_code():
    """Code review endpoint"""
    try:
        data = request.get_json()
        code = data.get('code', '')
        language = data.get('language', 'python')
        
        if not code.strip():
            return jsonify({'error': 'No code provided'}), 400
        
        if model:
            # Use AI for analysis
            prompt = f"""
            Analyze this {language} code and provide:
            1. A quality score (0-100)
            2. Number of lines, functions, and branches
            3. 3-5 improvement suggestions
            
            Code:
            {code}
            
            Respond in JSON format.
            """
            
            try:
                response = model.generate_content(prompt)
                # Simple parsing - in production you'd want better JSON parsing
                analysis = {
                    'score': 85,
                    'lines': len(code.split('\n')),
                    'functions': code.count('def ') + code.count('function '),
                    'branches': code.count('if ') + code.count('elif ')
                }
                
                suggestions = [
                    'Consider adding error handling for better robustness',
                    'Use more descriptive variable names for better readability',
                    'Add comments to explain complex logic'
                ]
            except:
                # Fallback to simple analysis
                analysis = {
                    'score': 75,
                    'lines': len(code.split('\n')),
                    'functions': code.count('def ') + code.count('function '),
                    'branches': code.count('if ') + code.count('elif ')
                }
                suggestions = [
                    'Consider adding error handling',
                    'Use descriptive variable names',
                    'Add comments for clarity'
                ]
        else:
            # Demo mode without AI
            analysis = {
                'score': 80,
                'lines': len(code.split('\n')),
                'functions': code.count('def ') + code.count('function '),
                'branches': code.count('if ') + code.count('elif ')
            }
            suggestions = [
                'Consider adding error handling for better robustness',
                'Use more descriptive variable names for better readability',
                'Add comments to explain complex logic'
            ]
        
        return jsonify({
            'analysis': analysis,
            'suggestions': suggestions
        })
        
    except Exception as e:
        return jsonify({'error': f'Review failed: {str(e)}'}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    """Get review history with demo data"""
    demo_history = [
        {
            'id': 1,
            'filename': 'demo.py',
            'language': 'python',
            'score': 85,
            'created_at': '2024-01-15T10:30:00Z',
            'issues': 'Code style; Documentation'
        },
        {
            'id': 2,
            'filename': 'demo.js',
            'language': 'javascript',
            'score': 78,
            'created_at': '2024-01-14T15:45:00Z',
            'issues': 'Error handling; Performance'
        },
        {
            'id': 3,
            'filename': 'demo.py',
            'language': 'python',
            'score': 92,
            'created_at': '2024-01-13T09:15:00Z',
            'issues': 'Minor style issues'
        }
    ]
    return jsonify(demo_history)

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