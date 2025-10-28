import requests
import time

# Test the optimized fast analysis
start_time = time.time()

try:
    response = requests.post('http://localhost:5000/api/review', 
        json={
            'code': '''def hello():
    print("Hello World")
    return "Success"''',
            'language': 'python',
            'filename': 'test.py'
        },
        timeout=15
    )
    
    end_time = time.time()
    duration = end_time - start_time
    
    if response.status_code == 200:
        result = response.json()
        print(f"SUCCESS: Fast analysis completed in {duration:.2f} seconds")
        print(f"Score: {result['analysis']['score']}")
        print(f"Syntax Errors: {len(result.get('syntax_errors', []))}")
        print(f"Logic Errors: {len(result.get('logic_errors', []))}")
        print(f"Suggestions: {len(result.get('suggestions', []))}")
        
        if result.get('ai_analysis'):
            print("\n=== AI ANALYSIS AVAILABLE ===")
            ai = result['ai_analysis']
            print(f"Has Corrected Code: {'Yes' if ai.get('corrected_code') else 'No'}")
            
    else:
        print(f"ERROR: Status {response.status_code}")
        
except Exception as e:
    print(f"ERROR: {e}")

print("\nSpeed Analysis:")
if duration < 3:
    print("🟢 EXCELLENT - Instant analysis!")
elif duration < 5:
    print("🟢 GREAT - Very fast!")
else:
    print("🟡 ACCEPTABLE - Still fast enough")
