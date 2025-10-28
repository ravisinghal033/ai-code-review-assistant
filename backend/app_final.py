from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'AI Code Review Assistant',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/review', methods=['POST'])
def review_code():
    try:
        data = request.get_json()
        code = data.get('code', '')
        language = data.get('language', 'python')
        
        if not code.strip():
            return jsonify({'error': 'No code provided'}), 400
        
        # Simple analysis
        lines = len(code.split('\n'))
        functions = code.count('def ') + code.count('function ')
        branches = code.count('if ') + code.count('elif ')
        
        # Calculate score
        score = min(100, max(0, 60 + (functions * 5) + (branches * 2) - (lines * 0.5)))
        
        analysis = {
            'score': int(score),
            'lines': lines,
            'functions': functions,
            'branches': branches
        }
        
        suggestions = [
            'Consider adding error handling for better robustness',
            'Use more descriptive variable names for better readability',
            'Add comments to explain complex logic',
            'Review code structure for maintainability'
        ]
        
        return jsonify({
            'analysis': analysis,
            'suggestions': suggestions
        })
        
    except Exception as e:
        return jsonify({'error': f'Review failed: {str(e)}'}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    # Demo history data
    history = [
        {
            'id': 1,
            'code': 'def hello():\n    print("Hello World")',
            'language': 'python',
            'score': 85,
            'created_at': '2024-01-15T10:30:00Z',
            'issues': 'Code style; Documentation'
        },
        {
            'id': 2,
            'code': 'function greet() {\n    console.log("Hello");\n}',
            'language': 'javascript',
            'score': 78,
            'created_at': '2024-01-14T15:45:00Z',
            'issues': 'Error handling; Performance'
        }
    ]
    return jsonify(history)

@app.route('/api/security-analysis', methods=['POST'])
def security_analysis():
    try:
        data = request.get_json()
        code = data.get('code', '')
        language = data.get('language', 'python')
        
        security_analysis = f"""
Security Analysis for {language} code:

🔍 Security Issues Found:
1. Input validation needed for user inputs
2. Consider using parameterized queries to prevent SQL injection
3. Add authentication checks for sensitive operations
4. Review error handling to avoid information disclosure

🛡️ Recommendations:
- Implement input sanitization
- Add rate limiting for API endpoints
- Use secure random number generation
- Review access control mechanisms

Overall Security Score: 75/100
        """
        
        return jsonify({
            'security_analysis': security_analysis,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': f'Security analysis failed: {str(e)}'}), 500

@app.route('/api/generate-tests', methods=['POST'])
def generate_tests_endpoint():
    try:
        data = request.get_json()
        code = data.get('code', '')
        language = data.get('language', 'python')
        
        if language == 'python':
            tests = """
import unittest

class TestGenerated(unittest.TestCase):
    def test_basic_functionality(self):
        # Test basic functionality
        result = your_function("test_input")
        self.assertEqual(result, "expected_output")
    
    def test_edge_cases(self):
        # Test edge cases
        with self.assertRaises(ValueError):
            your_function(None)

if __name__ == '__main__':
    unittest.main()
            """
        else:
            tests = """
// Generated tests for JavaScript
describe('Generated Tests', () => {
    test('basic functionality', () => {
        const result = yourFunction('test');
        expect(result).toBe('expected');
    });
});
            """
        
        return jsonify({
            'generated_tests': tests,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': f'Test generation failed: {str(e)}'}), 500

if __name__ == '__main__':
    print("🚀 Starting AI Code Review Assistant...")
    print("📍 Backend available at: http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)







