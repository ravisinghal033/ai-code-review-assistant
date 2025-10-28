# AI Code Review Assistant - Microservices Architecture

## 🏗️ **Architecture Overview**

This project has been transformed into a **microservices architecture** demonstrating enterprise-grade development practices suitable for Nagarro's Full Stack Developer with AI-SDLC & Cloud Skills role.

### **Service Architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │   AI Service    │
│   (React)       │◄──►│   (Port 5000)   │◄──►│   (Port 5001)   │
│   Port 3000     │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌────────┴────────┐
                       │                 │
                ┌─────────────┐  ┌─────────────┐
                │ Analytics   │  │   User      │
                │ Service     │  │   Service   │
                │ Port 5002   │  │ Port 5003   │
                └─────────────┘  └─────────────┘
```

## 🚀 **Services**

### **1. API Gateway (Port 5000)**
- **Purpose**: Central entry point for all requests
- **Features**:
  - Request routing and load balancing
  - Authentication and authorization
  - Rate limiting (per service)
  - Service health monitoring
  - Request/response logging

### **2. AI Service (Port 5001)**
- **Purpose**: AI-powered code analysis
- **Features**:
  - Security vulnerability detection
  - Automated test generation
  - Code quality prediction
  - Performance optimization suggestions
  - Google Gemini 2.5 Flash integration

### **3. Analytics Service (Port 5002)**
- **Purpose**: Data processing and analytics
- **Features**:
  - Metrics calculation and aggregation
  - Trend analysis and reporting
  - Dashboard data generation
  - Performance monitoring
  - Data visualization support

### **4. User Service (Port 5003)**
- **Purpose**: User management and authentication
- **Features**:
  - User registration and authentication
  - JWT token management
  - Role-based access control (RBAC)
  - Audit logging
  - Session management

## 🔧 **Enterprise Features**

### **Security & Authentication**
- JWT-based authentication
- Role-based access control (Admin, Developer, Viewer)
- Password hashing with salt
- Session management
- Audit trail logging

### **Scalability & Performance**
- Microservices architecture
- Service discovery and health checks
- Rate limiting per service
- Request timeout handling
- Load balancing capabilities

### **Monitoring & Observability**
- Service health monitoring
- Request/response logging
- Performance metrics
- Error tracking and reporting
- Audit trail for compliance

### **Advanced AI Capabilities**
- Security vulnerability analysis
- Automated test generation
- Code quality prediction
- Performance optimization suggestions
- Multi-language support

## 🛠️ **Technology Stack**

### **Backend Services**
- **Framework**: Flask (Python)
- **Database**: SQLite with SQLAlchemy ORM
- **Authentication**: JWT tokens
- **AI Integration**: Google Gemini 2.5 Flash
- **Containerization**: Docker

### **Frontend**
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **HTTP Client**: Axios

### **DevOps & Deployment**
- **Containerization**: Docker & Docker Compose
- **Service Orchestration**: Docker Compose
- **Environment Management**: Environment variables
- **Cloud Ready**: Vercel deployment ready

## 🚀 **Quick Start**

### **Prerequisites**
- Docker and Docker Compose
- Node.js (for frontend development)
- Python 3.11+ (for local development)

### **Environment Setup**
1. Create `.env` file in root directory:
```bash
GEMINI_API_KEY=your-gemini-api-key
JWT_SECRET=your-jwt-secret-key
```

### **Docker Deployment**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### **Local Development**
```bash
# Start each service individually
cd services/ai-service && python app.py
cd services/analytics-service && python app.py
cd services/user-service && python app.py
cd services/api-gateway && python app.py

# Start frontend
cd frontend && npm start
```

## 📊 **API Endpoints**

### **API Gateway (Port 5000)**
- `GET /api/gateway/health` - Gateway health check
- `GET /api/gateway/services` - Service status
- `GET /api/gateway/metrics` - Gateway metrics

### **AI Service (Port 5001)**
- `POST /api/ai/security-analysis` - Security vulnerability analysis
- `POST /api/ai/generate-tests` - Automated test generation
- `POST /api/ai/quality-prediction` - Code quality prediction
- `POST /api/ai/performance-optimization` - Performance suggestions

### **Analytics Service (Port 5002)**
- `POST /api/analytics/security-metrics` - Security metrics calculation
- `POST /api/analytics/quality-metrics` - Quality metrics calculation
- `GET /api/analytics/trends` - Trend analysis
- `GET /api/analytics/dashboard` - Dashboard data

### **User Service (Port 5003)**
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `GET /api/users/profile` - User profile
- `PUT /api/users/{id}/role` - Update user role (admin)
- `GET /api/users/audit-logs` - Audit logs (admin)

## 🎯 **Interview Benefits**

### **Technical Sophistication**
- **Microservices Architecture**: Demonstrates enterprise design patterns
- **Service Discovery**: Shows understanding of distributed systems
- **API Gateway**: Proves knowledge of modern API management
- **Containerization**: Docker expertise for cloud deployment

### **AI-SDLC Integration**
- **Advanced AI Features**: Security, testing, quality prediction
- **Real-time Analytics**: Comprehensive metrics and reporting
- **Multi-language Support**: Scalable AI integration
- **Performance Optimization**: AI-driven code improvement

### **Enterprise Features**
- **Authentication & Authorization**: JWT-based security
- **Role-based Access Control**: Enterprise-grade permissions
- **Audit Logging**: Compliance and monitoring
- **Rate Limiting**: Production-ready API management

### **Cloud & Scalability**
- **Docker Containerization**: Cloud deployment ready
- **Service Orchestration**: Scalable architecture
- **Health Monitoring**: Production observability
- **Load Balancing**: High availability design

## 📈 **Performance & Scalability**

### **Horizontal Scaling**
- Each service can be scaled independently
- Load balancing through API Gateway
- Database connection pooling
- Caching strategies ready

### **Monitoring & Observability**
- Service health checks
- Performance metrics collection
- Error tracking and alerting
- Audit trail for compliance

### **Security**
- JWT-based authentication
- Role-based access control
- Rate limiting and DDoS protection
- Secure password handling

This microservices architecture demonstrates **enterprise-grade development practices** perfect for showcasing your skills in a Nagarro Full Stack Developer interview! 🚀









