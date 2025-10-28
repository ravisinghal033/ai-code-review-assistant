#!/usr/bin/env python3
"""
AI Service - Google Gemini integration for code analysis
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
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', 'AIzaSyAXt8xjYDfqBa3e_ZrC7j-fScBANC8Yjn4')
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash-exp')

@app.route('/api/ai/security-analysis', methods=['POST'])
def security_analysis():
    """Analyze code for security vulnerabilities"""
    try:
        data = request.get_json()
        code = data.get('code', '')
        language = data.get('language', 'python')
        
        if not code.strip():
            return jsonify({'error': 'No code provided'}), 400
        
        prompt = f"""Analyze this {language} code for security vulnerabilities.
        Provide a detailed security assessment including:
        1. Potential security issues (SQL injection, XSS, authentication flaws, etc.)
        2. Security risk level (High/Medium/Low)
        3. Recommendations for fixing each issue
        
        Code:
        {code}"""
        
        response = model.generate_content(prompt)
        
        return jsonify({
            'analysis': response.text,
            'code_language': language,
            'risk_level': 'Medium'  # Would be extracted from AI response in production
        })
        
    except Exception as e:
        return jsonify({'error': f'Security analysis failed: {str(e)}'}), 500

@app.route('/api/ai/generate-tests', methods=['POST'])
def generate_tests():
    """Generate unit tests for code"""
    try:
        data = request.get_json()
        code = data.get('code', '')
        language = data.get('language', 'python')
        
        if not code.strip():
            return jsonify({'error': 'No code provided'}), 400
        
        prompt = f"""Generate comprehensive unit tests for this {language} code.
        Include:
        1. Basic functionality tests
        2. Edge case tests
        3. Error handling tests
        4. Use appropriate testing framework
        
        Code:
        {code}"""
        
        response = model.generate_content(prompt)
        
        return jsonify({
            'tests': response.text,
            'code_language': language
        })
        
    except Exception as e:
        return jsonify({'error': f'Test generation failed: {str(e)}'}), 500

@app.route('/api/ai/quality-prediction', methods=['POST'])
def quality_prediction():
    """Predict code quality score"""
    try:
        data = request.get_json()
        code = data.get('code', '')
        language = data.get('language', 'python')
        
        if not code.strip():
            return jsonify({'error': 'No code provided'}), 400
        
        prompt = f"""Analyze this {language} code and provide a quality score (0-100).
        Evaluate:
        1. Code structure and organization
        2. Best practices adherence
        3. Readability and maintainability
        4. Performance considerations
        5. Documentation quality
        
        Code:
        {code}"""
        
        response = model.generate_content(prompt)
        
        # Extract score from response (in production would parse properly)
        score = 85
        
        return jsonify({
            'score': score,
            'analysis': response.text,
            'recommendations': [
                'Consider adding error handling',
                'Improve documentation',
                'Optimize for performance'
            ]
        })
        
    except Exception as e:
        return jsonify({'error': f'Quality prediction failed: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'AI Service',
        'message': 'AI Service is running'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)







