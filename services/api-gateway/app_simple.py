#!/usr/bin/env python3
"""
Simplified API Gateway - Basic functionality only
"""
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Simple service configuration
AI_SERVICE_URL = 'http://localhost:5001'

@app.route('/api/review', methods=['POST'])
def review_code():
    """Simple code review endpoint"""
    try:
        data = request.get_json()
        code = data.get('code', '')
        language = data.get('language', 'python')
        
        if not code.strip():
            return jsonify({'error': 'No code provided'}), 400
        
        # Simple demo analysis
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
        
        return jsonify({
            'analysis': analysis,
            'suggestions': suggestions
        })
        
    except Exception as e:
        return jsonify({'error': f'Review failed: {str(e)}'}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    """Simple history endpoint with demo data"""
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
        }
    ]
    return jsonify(demo_history)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'API Gateway',
        'message': 'Service is running'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)















