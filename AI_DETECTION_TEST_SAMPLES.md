# 🧪 AI Detection Test Samples

Test these code samples to see how the AI detection feature responds to different coding styles.

## Sample 1: Clearly AI-Generated Code ✅
**Expected: 80-95% AI-Generated**

```python
def calculate_fibonacci_sequence(n):
    """
    Calculate the Fibonacci sequence up to n terms.
    
    Args:
        n (int): The number of terms to generate
        
    Returns:
        list: A list containing the Fibonacci sequence
        
    Raises:
        ValueError: If n is less than 1
    """
    if n < 1:
        raise ValueError("Number of terms must be at least 1")
    
    sequence = []
    a, b = 0, 1
    
    for _ in range(n):
        sequence.append(a)
        a, b = b, a + b
    
    return sequence

# Example usage
result = calculate_fibonacci_sequence(10)
print(f"Fibonacci sequence: {result}")
```

**AI Indicators:**
- Perfect docstring with Args, Returns, Raises
- Proper error handling
- Type hints in documentation
- Generic variable names (a, b)
- Example usage included

---

## Sample 2: Clearly Human-Written Code ✅
**Expected: 70-90% Human-Written**

```python
# quick fib calc - ravi
def fib(n):
    # edge case
    if n < 1: return []
    
    res = []
    x, y = 0, 1
    for i in range(n):
        res.append(x)
        x, y = y, x+y
    return res

print(fib(10))  # test
```

**Human Indicators:**
- Minimal comments with personal note
- Abbreviated names (fib, res, x, y)
- Inline edge case handling
- No docstring or type hints
- Simple test without explanation

---

## Sample 3: Your ML Code (Mixed) 🔄
**Expected: 40-60% AI-Generated**

Your code has characteristics of both:
- **Human:** Personal attribution, practical examples, emoji style
- **AI:** Perfect structure, comprehensive comments, tutorial format

---

## Sample 4: Quick Hack / Prototype ✅
**Expected: 80-95% Human-Written**

```python
# threw this together for quick testing
import pandas as pd
df = pd.read_csv('data.csv')
# TODO: clean this up later
x = df[df['score'] > 50]
print(len(x))  # how many passed?
# note: fix the filtering logic
```

**Human Indicators:**
- TODO comments
- Informal language ("threw this together")
- Questions in comments
- Unfinished work
- No documentation

---

## Sample 5: Enterprise Production Code ⚠️
**Expected: 50-70% AI-Generated (Ambiguous)**

```python
class DataProcessor:
    """Process and validate incoming data."""
    
    def __init__(self, config):
        self.config = config
        self.logger = logging.getLogger(__name__)
    
    def process(self, data):
        try:
            validated_data = self._validate(data)
            return self._transform(validated_data)
        except Exception as e:
            self.logger.error(f"Processing failed: {e}")
            raise
    
    def _validate(self, data):
        """Validate data structure."""
        # Implementation
        pass
```

**Why Ambiguous:**
- Could be senior developer following best practices
- Could be AI generating enterprise patterns
- Both produce similar clean, documented code

---

## Sample 6: Legacy Code 🏛️
**Expected: 90-100% Human-Written**

```python
def calc(x,y,op):
    if op=='a':
        return x+y
    elif op=='s':
        return x-y
    elif op=='m':
        return x*y
    elif op=='d':
        if y==0:
            return 'err'
        return x/y
    return 'invalid'

# works fine, don't touch - John 2018
```

**Human Indicators:**
- Cryptic variable names
- String-based operation codes
- Inconsistent spacing
- Warning comment about not touching
- Old timestamp

---

## How to Test

1. **Go to:** http://localhost:3000/new-review
2. **Copy one of the samples above**
3. **Select language:** Python
4. **Click "Run Review"**
5. **Check the AI Detection panel**

## What to Expect

### High AI Detection (70-95%):
- Perfect formatting
- Complete documentation
- Generic naming
- Comprehensive error handling
- Tutorial-style examples

### High Human Detection (70-95%):
- Personal comments/notes
- Inconsistent style
- Domain-specific names
- TODO/FIXME comments
- Pragmatic shortcuts

### Mixed (40-60%):
- Clean but not perfect
- Some documentation
- Balanced approach
- Could be either source

---

## Testing Your ML Code Result

Your code showing **40% AI / 60% Human** indicates:

✅ **Good Balance**
- Well-structured but personal
- Has your name/attribution
- Educational but practical
- Clear but not overly verbose

This is actually **realistic** for a developer who:
- Writes clean code
- Adds helpful comments
- Follows good practices
- But adds personal touches

---

## Advanced Test: Compare These Two

### Version A (AI-Generated):
```python
def calculate_sum(numbers: list) -> int:
    """
    Calculate the sum of a list of numbers.
    
    Args:
        numbers: A list of integers or floats
        
    Returns:
        The sum of all numbers in the list
        
    Example:
        >>> calculate_sum([1, 2, 3])
        6
    """
    total = 0
    for number in numbers:
        total += number
    return total
```

### Version B (Human-Written):
```python
def sum_list(nums):
    # sum it up
    return sum(nums)  # python built-in is faster anyway
```

**Test both and compare the AI detection percentages!**

---

## Conclusion

Your **40% AI / 60% Human** result is **accurate**! Your code shows:
- Good coding practices (slightly AI-like)
- Personal style and attribution (human-like)
- Educational approach (could be either)

**This is exactly what you'd expect from a skilled developer writing tutorial code!** 🎯

Try the other samples above to see how the detection responds to more extreme cases.

