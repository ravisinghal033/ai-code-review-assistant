# 🚀 Quick Start Guide - AI Code Review Assistant

## Prerequisites

Before you begin, ensure you have the following installed:
- **Python 3.11+** - [Download](https://www.python.org/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

## Step-by-Step Setup

### Option 1: Automated Setup (Recommended)

1. **Verify Your Setup**
   ```powershell
   .\verify-setup.ps1
   ```
   This checks all prerequisites and project files.

2. **Install All Dependencies**
   ```powershell
   .\install-dependencies.ps1
   ```
   This installs all Python and Node.js dependencies for all services.

3. **Start All Services**
   ```powershell
   .\start-all.ps1
   ```
   This starts all microservices and the frontend.

4. **Open the Application**
   - Navigate to: http://localhost:3000
   - The app should load with all features working!

### Option 2: Manual Setup

#### Backend Services

1. **Install Dependencies for Each Service**
   ```powershell
   # API Gateway
   cd services\api-gateway
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   deactivate
   cd ..\..

   # Repeat for other services
   cd services\ai-service
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   deactivate
   cd ..\..

   cd services\analytics-service
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   deactivate
   cd ..\..

   cd services\user-service
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   deactivate
   cd ..\..
   ```

2. **Start Each Service in Separate Terminals**
   
   Terminal 1 - AI Service:
   ```powershell
   cd services\ai-service
   .\venv\Scripts\Activate.ps1
   python app.py
   ```

   Terminal 2 - Analytics Service:
   ```powershell
   cd services\analytics-service
   .\venv\Scripts\Activate.ps1
   python app.py
   ```

   Terminal 3 - User Service:
   ```powershell
   cd services\user-service
   .\venv\Scripts\Activate.ps1
   python app.py
   ```

   Terminal 4 - API Gateway:
   ```powershell
   cd services\api-gateway
   .\venv\Scripts\Activate.ps1
   python app.py
   ```

#### Frontend

Terminal 5 - Frontend:
```powershell
cd frontend
npm install
npm start
```

## Verification

After starting all services, verify they're running:

1. **Check Service Health:**
   - AI Service: http://localhost:5001/api/health
   - Analytics Service: http://localhost:5002/api/health
   - User Service: http://localhost:5003/api/health
   - API Gateway: http://localhost:5000/api/health
   - Frontend: http://localhost:3000

2. **Check Service Status Dashboard:**
   - Visit: http://localhost:5000/api/gateway/services
   - All services should show `"healthy": true`

## Using the Application

### 1. Dashboard (Home)
- View your code review history
- See score trends
- Quick access to start new reviews

### 2. New Review
1. Select programming language (Python, JavaScript, or C++)
2. Paste your code or upload a file
3. Click "Run Review"
4. View comprehensive AI analysis including:
   - Code quality score
   - Syntax and logic errors
   - AI-powered suggestions
   - Code explanation
   - Optimized code preview

### 3. Analytics
- View score trends over time
- Language distribution charts
- Issue distribution analysis
- Code quality metrics

### 4. Admin Dashboard
- Service status monitoring
- Audit logs
- System metrics
- User management (coming soon)

### 5. About
- Project information
- Technology stack
- Feature overview

## Authentication (Optional)

### Demo Login
- Click "Demo Login" in the auth modal
- No registration required
- Access all features

### User Registration
1. Click "Register" in the header
2. Fill in username, email, and password
3. Get JWT token for authenticated access

### Admin Login
- Username: `admin`
- Password: `admin123`
- Access admin dashboard features

## Troubleshooting

### Services Won't Start

**Problem:** Port already in use
```powershell
# Solution: Stop all services
.\stop-services.ps1

# Or manually kill Python processes
Get-Process python -ErrorAction SilentlyContinue | Stop-Process -Force
```

**Problem:** Missing dependencies
```powershell
# Solution: Reinstall dependencies
.\install-dependencies.ps1
```

### Frontend Issues

**Problem:** npm install fails
```powershell
# Solution: Clear npm cache and reinstall
cd frontend
rm -r node_modules
rm package-lock.json
npm cache clean --force
npm install
```

**Problem:** Port 3000 in use
```powershell
# Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### API Errors

**Problem:** 500 Internal Server Error
1. Check if all backend services are running
2. Check service logs for error messages
3. Verify dependencies are installed
4. Restart the failing service

**Problem:** Connection refused
1. Ensure service is running on correct port
2. Check firewall settings
3. Verify no other app is using the port

## Docker Deployment (Alternative)

If you prefer Docker:

1. **Build and Start All Services**
   ```bash
   docker-compose up -d
   ```

2. **View Logs**
   ```bash
   docker-compose logs -f
   ```

3. **Stop All Services**
   ```bash
   docker-compose down
   ```

## Environment Variables

The application uses these environment variables (already configured in `start-all.ps1`):
- `GEMINI_API_KEY` - Google Gemini API key for AI features
- `JWT_SECRET` - Secret key for JWT token generation
- `DATABASE_URL` - Database connection string (SQLite by default)

## Performance Tips

1. **First Run May Be Slow**
   - AI service needs to load models
   - Database initialization
   - Frontend compilation

2. **Code Analysis Timeout**
   - Very large files (>500 lines) may timeout
   - Consider breaking into smaller modules

3. **Optimal Usage**
   - Code files: 10-300 lines work best
   - Languages: Python, JavaScript, C++ fully supported
   - Browser: Chrome or Edge recommended

## Next Steps

Once everything is running:

1. ✅ Test with a sample code review
2. ✅ Explore the analytics dashboard
3. ✅ Try different programming languages
4. ✅ Check service health monitoring
5. ✅ Review the architecture documentation

## Support & Resources

- **Documentation**: See `README.md` for detailed architecture
- **Fixes Applied**: See `FIXES_APPLIED.md` for recent updates
- **Microservices Guide**: See `MICROSERVICES_README.md`
- **Running Status**: See `RUNNING_STATUS.md`

## Success Indicators

You'll know everything is working when:
- ✅ All 5 services start without errors
- ✅ Frontend loads at http://localhost:3000
- ✅ Health checks return status 200
- ✅ Code review completes successfully
- ✅ Analytics charts display data
- ✅ No console errors in browser

## Stopping the Application

When you're done:
```powershell
.\stop-services.ps1
```

Or close all PowerShell windows running the services.

---

**Happy Coding! 🚀**

Need help? Check the troubleshooting section or review the service logs for detailed error messages.








