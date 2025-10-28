# AI Code Review Assistant - Backend

Flask backend for the AI Code Review Assistant application with Google Gemini AI integration.

## Setup

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Environment Configuration:**
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   - Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=AIza-your-actual-gemini-key-here
   ```

3. **Run the application:**
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

- `POST /api/review` - Submit code for review
- `GET /api/history` - Get review history

## Features

- **Code Analysis**: Automated code quality scoring based on:
  - Function count and complexity
  - Comment ratio
  - Variable naming conventions
  - Branching complexity
  
- **AI Integration**: Google Gemini 2.5 Flash for intelligent code suggestions
- **Database**: SQLite database for storing review history
- **Analytics**: Comprehensive analytics dashboard with multiple chart types

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required for AI suggestions)
- `DATABASE_URL`: Database connection string (defaults to SQLite)
- `FLASK_ENV`: Flask environment (development/production)
- `FLASK_APP`: Flask application file

## Security Note

Never commit your `.env` file with real API keys. The `.env.example` file shows the required format without exposing sensitive information.