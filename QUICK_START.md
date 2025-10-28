# 🚀 Quick Start Guide - Microservices Architecture

## **What's New?**
Your project has been upgraded to a **microservices architecture** with enterprise features perfect for your Nagarro interview!

## **🎯 How to Run Everything**

### **Option 1: PowerShell Script (Recommended for Windows)**
```powershell
# Start all services with one command
.\start-services.ps1
```

### **Option 2: Manual Start (If you prefer step-by-step)**
```powershell
# 1. Start AI Service
cd services\ai-service
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py

# 2. Start Analytics Service (new terminal)
cd services\analytics-service
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py

# 3. Start User Service (new terminal)
cd services\user-service
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py

# 4. Start API Gateway (new terminal)
cd services\api-gateway
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py

# 5. Start Frontend (new terminal)
cd frontend
npm install
npm start
```

## **🌐 Access Your Application**

- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:5000
- **AI Service**: http://localhost:5001
- **Analytics Service**: http://localhost:5002
- **User Service**: http://localhost:5003

## **✨ New Features Available**

### **1. Security Analysis**
- Navigate to "Security Analysis" in the sidebar
- Paste your code and get security vulnerability analysis
- Detects SQL injection, XSS, authentication issues

### **2. Test Generation**
- Navigate to "Test Generation" in the sidebar
- Generate comprehensive unit tests automatically
- Covers edge cases and boundary conditions

### **3. Admin Dashboard**
- Navigate to "Admin Dashboard" in the sidebar
- Monitor all services health
- View audit logs and system metrics
- Manage user roles (admin only)

### **4. Enhanced Analytics**
- Real-time service monitoring
- Advanced metrics and reporting
- Service health status

## **🔧 Environment Setup**

The system will automatically create a `.env` file with your Gemini API key. If you need to modify it:

```bash
# Create .env file in root directory
GEMINI_API_KEY=AIzaSyAXt8xjYDfqBa3e_ZrC7j-fScBANC8Yjn4
JWT_SECRET=your-super-secret-jwt-key-change-in-production
DATABASE_URL=sqlite:///app.db
```

## **🛑 Stop All Services**

```powershell
# Stop all services
.\stop-services.ps1
```

## **📊 Service Health Checks**

- **Gateway Health**: http://localhost:5000/api/gateway/health
- **Service Status**: http://localhost:5000/api/gateway/services
- **Gateway Metrics**: http://localhost:5000/api/gateway/metrics

## **🎯 Interview Benefits**

This microservices architecture demonstrates:

### **Technical Excellence**
- **Microservices Architecture**: Enterprise design patterns
- **Service Discovery**: Health checks and monitoring
- **API Gateway**: Request routing and load balancing
- **Containerization**: Docker-ready for cloud deployment

### **AI-SDLC Integration**
- **Security Analysis**: AI-powered vulnerability detection
- **Test Generation**: Automated unit test creation
- **Quality Prediction**: ML-based code quality scoring
- **Performance Optimization**: AI-driven improvements

### **Enterprise Features**
- **JWT Authentication**: Secure token-based auth
- **Role-Based Access Control**: Admin, Developer, Viewer roles
- **Audit Logging**: Complete audit trail
- **Rate Limiting**: DDoS protection and API management

### **Cloud & Scalability**
- **Docker Containerization**: Cloud deployment ready
- **Service Orchestration**: Scalable architecture
- **Health Monitoring**: Production observability
- **Load Balancing**: High availability design

## **🚀 Ready for Your Nagarro Interview!**

Your project now showcases **enterprise-grade development practices** that will definitely impress the interviewers! 

The microservices architecture, advanced AI capabilities, enterprise security features, and scalability implementations make this a truly professional and impressive project for your Full Stack Developer with AI-SDLC & Cloud Skills interview.

## **📖 Documentation**

- **[Microservices Architecture](MICROSERVICES_README.md)** - Detailed architecture documentation
- **[Docker Configuration](docker-compose.yml)** - Container orchestration
- **[Service APIs](services/)** - Individual service documentation

## **💡 Troubleshooting**

If you encounter issues:

1. **Port conflicts**: Make sure ports 3000, 5000-5003 are available
2. **Python issues**: Ensure Python 3.11+ is installed
3. **Node issues**: Ensure Node.js 16+ is installed
4. **API key issues**: Check your Gemini API key in the .env file

## **🎉 You're All Set!**

Your AI Code Review Assistant is now a **enterprise-grade microservices application** ready to showcase your skills in the Nagarro interview! 🚀







