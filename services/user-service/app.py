#!/usr/bin/env python3
"""
User Service - Authentication and user management
"""
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import sqlite3
import jwt
from datetime import datetime, timedelta
import hashlib
import secrets

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
JWT_SECRET = os.getenv('JWT_SECRET', 'your-super-secret-jwt-key-2024')
DB_PATH = 'app.db'

def init_db():
    """Initialize database"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'viewer',
            created_at TEXT NOT NULL
        )
    ''')
    
    # Create admin user if doesn't exist
    cursor.execute('SELECT * FROM users WHERE username=?', ('admin',))
    if not cursor.fetchone():
        password_hash = hashlib.sha256('admin123'.encode()).hexdigest()
        cursor.execute('''
            INSERT INTO users (username, email, password_hash, role, created_at)
            VALUES (?, ?, ?, ?, ?)
        ''', ('admin', 'admin@example.com', password_hash, 'admin', datetime.now().isoformat()))
    
    conn.commit()
    conn.close()

init_db()

@app.route('/api/users/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role', 'viewer')
        
        if not username or not email or not password:
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Hash password
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        # Store in database
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        try:
            cursor.execute('''
                INSERT INTO users (username, email, password_hash, role, created_at)
                VALUES (?, ?, ?, ?, ?)
            ''', (username, email, password_hash, role, datetime.now().isoformat()))
            conn.commit()
            user_id = cursor.lastrowid
        except sqlite3.IntegrityError:
            conn.close()
            return jsonify({'error': 'Username or email already exists'}), 400
        
        conn.close()
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': user_id,
            'username': username,
            'role': role,
            'exp': datetime.utcnow() + timedelta(days=1)
        }, JWT_SECRET, algorithm='HS256')
        
        return jsonify({
            'token': token,
            'user': {
                'id': user_id,
                'username': username,
                'email': email,
                'role': role
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': f'Registration failed: {str(e)}'}), 500

@app.route('/api/users/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'error': 'Missing credentials'}), 400
        
        # Hash password
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        # Check credentials
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, username, email, role FROM users
            WHERE username=? AND password_hash=?
        ''', (username, password_hash))
        user = cursor.fetchone()
        conn.close()
        
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': user[0],
            'username': user[1],
            'role': user[3],
            'exp': datetime.utcnow() + timedelta(days=1)
        }, JWT_SECRET, algorithm='HS256')
        
        return jsonify({
            'token': token,
            'user': {
                'id': user[0],
                'username': user[1],
                'email': user[2],
                'role': user[3]
            }
        })
        
    except Exception as e:
        return jsonify({'error': f'Login failed: {str(e)}'}), 500

@app.route('/api/users/profile', methods=['GET'])
def get_profile():
    """Get user profile"""
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Unauthorized'}), 401
        
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('SELECT id, username, email, role FROM users WHERE id=?', (payload['user_id'],))
        user = cursor.fetchone()
        conn.close()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'id': user[0],
            'username': user[1],
            'email': user[2],
            'role': user[3]
        })
        
    except Exception as e:
        return jsonify({'error': f'Profile fetch failed: {str(e)}'}), 500

@app.route('/api/users/audit-logs', methods=['GET'])
def get_audit_logs():
    """Get audit logs (admin only)"""
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Unauthorized'}), 401
        
        # For now, return demo audit logs
        # In production, these would come from a database
        demo_logs = [
            {
                'id': 1,
                'timestamp': datetime.now().isoformat(),
                'user_id': 1,
                'action': 'USER_LOGIN',
                'resource': '/api/users/login',
                'details': 'Successful login'
            },
            {
                'id': 2,
                'timestamp': datetime.now().isoformat(),
                'user_id': 2,
                'action': 'USER_CREATED',
                'resource': '/api/users/register',
                'details': 'New user registration'
            }
        ]
        
        return jsonify({'logs': demo_logs})
        
    except Exception as e:
        return jsonify({'error': f'Failed to fetch audit logs: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'User Service',
        'message': 'User Service is running'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, debug=True)




