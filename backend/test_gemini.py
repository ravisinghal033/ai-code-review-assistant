#!/usr/bin/env python3
"""
Test script for Gemini API integration
"""
import os
from dotenv import load_dotenv

load_dotenv()

def test_gemini_connection():
    """Test Gemini API connection"""
    api_key = os.getenv('GEMINI_API_KEY')
    
    if not api_key:
        print("ERROR: No Gemini API key found in environment")
        return False
    
    if not api_key.startswith('AIza'):
        print("ERROR: Invalid Gemini API key format")
        return False
    
    try:
        import google.generativeai as genai
        
        # Configure Gemini API
        genai.configure(api_key=api_key)
        
        # Initialize the model
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Test with a simple request
        response = model.generate_content('Say "Hello, Gemini integration works!"')
        
        result = response.text.strip()
        print(f"SUCCESS: Gemini API test successful: {result}")
        return True
        
    except Exception as e:
        print(f"ERROR: Gemini API test failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("Testing Gemini integration...")
    test_gemini_connection()
