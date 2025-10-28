#!/usr/bin/env python3
"""
List available Gemini models
"""
import os
from dotenv import load_dotenv

load_dotenv()

def list_gemini_models():
    """List available Gemini models"""
    api_key = os.getenv('GEMINI_API_KEY')
    
    if not api_key:
        print("ERROR: No Gemini API key found in environment")
        return False
    
    try:
        import google.generativeai as genai
        
        # Configure Gemini API
        genai.configure(api_key=api_key)
        
        # List available models
        models = genai.list_models()
        
        print("Available Gemini models:")
        for model in models:
            if 'generateContent' in model.supported_generation_methods:
                print(f"- {model.name}")
        
        return True
        
    except Exception as e:
        print(f"ERROR: Failed to list models: {str(e)}")
        return False

if __name__ == "__main__":
    print("Listing Gemini models...")
    list_gemini_models()









