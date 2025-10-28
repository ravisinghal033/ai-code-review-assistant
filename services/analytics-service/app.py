#!/usr/bin/env python3
"""
Analytics Service - Data processing and analytics
"""
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import sqlite3
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
DB_PATH = 'app.db'

def init_db():
    """Initialize database"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS analytics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            metric_name TEXT NOT NULL,
            value REAL NOT NULL,
            timestamp TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/api/analytics/security-metrics', methods=['POST'])
def security_metrics():
    """Calculate security metrics"""
    try:
        data = request.get_json()
        
        # Calculate metrics
        metrics = {
            'total_vulnerabilities': data.get('vulnerabilities', 0),
            'high_severity': data.get('high_severity', 0),
            'medium_severity': data.get('medium_severity', 0),
            'low_severity': data.get('low_severity', 0),
            'security_score': 100 - (data.get('vulnerabilities', 0) * 10)
        }
        
        # Store in database
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO analytics (metric_name, value, timestamp)
            VALUES (?, ?, ?)
        ''', ('security_score', metrics['security_score'], datetime.now().isoformat()))
        conn.commit()
        conn.close()
        
        return jsonify(metrics)
        
    except Exception as e:
        return jsonify({'error': f'Metrics calculation failed: {str(e)}'}), 500

@app.route('/api/analytics/quality-metrics', methods=['POST'])
def quality_metrics():
    """Calculate quality metrics"""
    try:
        data = request.get_json()
        
        metrics = {
            'average_score': data.get('score', 0),
            'code_quality_trend': 'improving',
            'code_complexity': data.get('complexity', 0),
            'maintainability_index': data.get('maintainability', 0)
        }
        
        return jsonify(metrics)
        
    except Exception as e:
        return jsonify({'error': f'Metrics calculation failed: {str(e)}'}), 500

@app.route('/api/analytics/trends', methods=['GET'])
def get_trends():
    """Get trend analysis"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM analytics ORDER BY timestamp DESC LIMIT 10')
        results = cursor.fetchall()
        conn.close()
        
        trends = []
        for row in results:
            trends.append({
                'id': row[0],
                'metric': row[1],
                'value': row[2],
                'timestamp': row[3]
            })
        
        return jsonify(trends)
        
    except Exception as e:
        return jsonify({'error': f'Trend analysis failed: {str(e)}'}), 500

@app.route('/api/analytics/dashboard', methods=['GET'])
def get_dashboard():
    """Get dashboard data"""
    try:
        dashboard_data = {
            'total_reviews': 100,
            'average_score': 85,
            'security_issues': 5,
            'quality_trend': 'increasing',
            'recent_activity': []
        }
        
        return jsonify(dashboard_data)
        
    except Exception as e:
        return jsonify({'error': f'Dashboard data failed: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'Analytics Service',
        'message': 'Analytics Service is running'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)











