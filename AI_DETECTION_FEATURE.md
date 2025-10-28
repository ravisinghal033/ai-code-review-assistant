# 🤖 AI vs Human Code Detection Feature

## Overview

Added a comprehensive **AI-Generated vs Human-Written Code Detection** feature to the code review system. This feature analyzes submitted code and provides insights into whether the code was written by AI or a human developer.

## What Was Added

### Backend Changes (`services/api-gateway/app.py`)

1. **Enhanced AI Prompt** - Added a new section to the code review prompt:
   - Analyzes code patterns that indicate AI generation
   - Analyzes code patterns that indicate human authorship
   - Provides percentage breakdown (AI vs Human)
   - Includes confidence level assessment
   - Lists key indicators found
   - Delivers a clear verdict

2. **Response Parsing** - Added extraction logic for:
   - `ai_generated_percentage` (0-100%)
   - `human_written_percentage` (0-100%)
   - `confidence` (Low/Medium/High)
   - `indicators` (array of detected patterns)
   - `verdict` (textual summary)

3. **API Response Updates** - Modified endpoints to include `ai_detection` data:
   - `/api/review` - Returns AI detection in review response
   - `/api/history` - Includes AI detection in history items
   - `/api/review/<id>` - Returns AI detection for specific reviews

4. **Database Updates** - AI detection data is stored in the database for historical tracking

### Frontend Changes

#### 1. **NewReview.js** (`frontend/src/pages/NewReview.js`)

Added a beautiful, gradient-styled UI component that displays:

- **Visual Progress Bars** showing AI-Generated vs Human-Written percentages
- **Confidence Level Badge** with color-coding (High/Medium/Low)
- **Verdict Statement** explaining the analysis result
- **Key Indicators** as styled tags showing detected patterns

Features:
- Purple/Pink gradient design for visual appeal
- Animated percentage bars
- Responsive layout
- Clear, professional presentation

#### 2. **ReviewDetailModal.js** (`frontend/src/components/ReviewDetailModal.js`)

Added the same AI detection display to the review detail modal:
- Compact version suitable for modal view
- Same visual style and information
- Integrated seamlessly with existing layout

## Detection Criteria

### AI-Generated Code Indicators
- Overly verbose or redundant comments
- Perfect formatting and consistent naming (unnaturally perfect)
- Generic variable names (e.g., temp, data, result, item)
- Excessive error handling for simple tasks
- Boilerplate-heavy structure
- Lack of personal coding style or quirks
- Too many type hints or documentation strings
- Cookie-cutter patterns without customization

### Human-Written Code Indicators
- Inconsistent formatting or spacing
- Personal coding style and shortcuts
- Domain-specific variable names
- Comments that reflect thinking process
- Unique problem-solving approaches
- Minor typos or unconventional patterns
- Code evolution signs (refactoring, old comments)
- Pragmatic over perfect solutions

## How It Works

1. **Code Submission** - User submits code for review
2. **AI Analysis** - Google Gemini analyzes the code structure, patterns, and style
3. **Pattern Detection** - AI identifies indicators of AI-generated vs human-written code
4. **Percentage Calculation** - Determines likelihood percentages for each category
5. **Confidence Assessment** - Evaluates confidence in the detection
6. **Result Display** - Shows comprehensive analysis in the UI

## Example Output

```json
{
  "ai_detection": {
    "ai_generated_percentage": 75,
    "human_written_percentage": 25,
    "confidence": "High",
    "indicators": [
      "Perfect formatting",
      "Generic variable names",
      "Excessive comments"
    ],
    "verdict": "This code appears to be primarily AI-generated with minor human modifications"
  }
}
```

## UI Features

### Visual Elements
- 🤖 **Icon** - Robot emoji for easy identification
- **Gradient Background** - Purple to pink gradient for visual appeal
- **Progress Bars** - Animated, color-coded percentage bars
- **Confidence Badge** - Color-coded (green/yellow/red) confidence indicator
- **Verdict Box** - White background box with clear verdict statement
- **Indicator Tags** - Purple tags for each detected pattern

### Color Coding
- **AI-Generated**: Purple gradient (purple-500 to purple-600)
- **Human-Written**: Blue gradient (blue-500 to blue-600)
- **High Confidence**: Green badge
- **Medium Confidence**: Yellow badge
- **Low Confidence**: Red badge

## Testing the Feature

### To Test:

1. **Navigate to New Review** - http://localhost:3000/new-review
2. **Submit Sample Code** - Paste any code (Python, JavaScript, or C++)
3. **Run Review** - Click "Run Review" button
4. **View Results** - The AI detection panel will appear below the score
5. **Check History** - View past reviews with AI detection data

### Sample Test Cases:

**Test 1: AI-Generated Code**
```python
def calculate_sum(numbers):
    """
    Calculate the sum of a list of numbers.
    
    Args:
        numbers: A list of numbers to sum
        
    Returns:
        The sum of all numbers in the list
    """
    total = 0
    for num in numbers:
        total += num
    return total
```

**Test 2: Human-Written Code**
```python
def calc_sum(nums):
    # quick sum
    tot = 0
    for n in nums:
        tot += n
    return tot
```

## Benefits

1. **Academic Integrity** - Helps identify AI-generated assignments
2. **Code Review Enhancement** - Provides additional context about code origin
3. **Learning Tool** - Helps developers understand AI coding patterns
4. **Quality Assessment** - Distinguishes between AI boilerplate and custom solutions
5. **Transparency** - Shows users what patterns indicate AI authorship

## Future Enhancements

Potential improvements:
- Machine learning model for more accurate detection
- Historical tracking of AI usage trends
- Comparison with known AI models (GPT, Claude, Copilot patterns)
- Suggestions for "humanizing" AI-generated code
- Integration with plagiarism detection tools

## Technical Details

### API Endpoint Changes
- All review endpoints now include `ai_detection` object
- Backward compatible (returns defaults if not analyzed)
- Stored in database for historical analysis

### Performance Impact
- Minimal overhead (uses same AI call)
- No additional API requests
- Cached with review data

### Database Schema
- Added to existing `analysis_data` JSON field
- No migration required
- Compatible with existing reviews

## Files Modified

1. `services/api-gateway/app.py` - Backend logic and AI prompt
2. `frontend/src/pages/NewReview.js` - Main review page UI
3. `frontend/src/components/ReviewDetailModal.js` - Review detail modal

## Success Metrics

✅ Backend successfully detects AI patterns
✅ Frontend displays results beautifully
✅ Data persists in database
✅ History includes AI detection
✅ Modal displays AI detection
✅ No linter errors
✅ Services running successfully

## Conclusion

The AI vs Human Code Detection feature is now fully integrated into the code review system. Users can immediately see whether their code appears to be AI-generated or human-written, along with detailed indicators and confidence levels.

**Try it now at:** http://localhost:3000/new-review

---

**Feature Status**: ✅ **LIVE and READY TO USE**

