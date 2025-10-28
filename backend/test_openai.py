#!/usr/bin/env python3
"""
Test script for OpenAI integration
"""
import os
from dotenv import load_dotenv

load_dotenv()

def test_openai_connection():
    """Test OpenAI API connection"""
    api_key = os.getenv('AI_API_KEY')
    
    if not api_key:
        print("❌ No API key found in environment")
        return False
    
    if not api_key.startswith('sk-'):
        print("❌ Invalid API key format")
        return False
    
    try:
        from openai import OpenAI
        
        # Clear proxy environment variables
        proxy_vars = ['HTTP_PROXY', 'HTTPS_PROXY', 'http_proxy', 'https_proxy', 'ALL_PROXY', 'all_proxy']
        for key in proxy_vars:
            if key in os.environ:
                del os.environ[key]
        
        client = OpenAI(api_key=api_key)
        
        # Test with a simple request
        response = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=[{'role': 'user', 'content': 'Say "Hello, OpenAI integration works!"'}],
            max_tokens=50
        )
        
        result = response.choices[0].message.content.strip()
        print(f"SUCCESS: OpenAI API test successful: {result}")
        return True
        
    except Exception as e:
        print(f"ERROR: OpenAI API test failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("Testing OpenAI integration...")
    test_openai_connection()
