# AI Code Review Assistant - Microservices Architecture

A **enterprise-grade** web application demonstrating **microservices architecture** with AI-powered code analysis. Built for showcasing **Full Stack Developer with AI-SDLC & Cloud Skills** capabilities, perfect for Nagarro interviews.

## 🏗️ **Architecture Overview**

This project demonstrates **microservices architecture** with enterprise features:

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

## 🚀 **Enterprise Features**

### **Microservices Architecture**
- **API Gateway**: Request routing, load balancing, rate limiting
- **AI Service**: Security analysis, test generation, quality prediction
- **Analytics Service**: Metrics calculation, trend analysis, reporting
- **User Service**: Authentication, RBAC, audit logging

### **Advanced AI Capabilities**
- **Security Vulnerability Detection**: SQL injection, XSS, authentication issues
- **Automated Test Generation**: Comprehensive unit tests with edge cases
- **Code Quality Prediction**: ML-based quality scoring and recommendations
- **Performance Optimization**: AI-driven performance improvement suggestions

### **Enterprise Security**
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Admin, Developer, Viewer roles
- **Audit Logging**: Complete audit trail for compliance
- **Rate Limiting**: DDoS protection and API management

### **Scalability & Performance**
- **Service Discovery**: Health checks and service monitoring
- **Load Balancing**: Distributed request handling
- **Containerization**: Docker-ready for cloud deployment
- **Horizontal Scaling**: Independent service scaling

## 🛠️ **Technology Stack**

### **Backend Services**
- **Framework**: Flask (Python) - Microservices
- **Database**: SQLite with SQLAlchemy ORM
- **Authentication**: JWT tokens with PyJWT
- **AI Integration**: Google Gemini 2.5 Flash
- **Containerization**: Docker & Docker Compose

### **Frontend**
- **Framework**: React 18 with modern hooks
- **Styling**: Tailwind CSS for responsive design
- **Charts**: Chart.js with react-chartjs-2
- **HTTP Client**: Axios with interceptors
- **Routing**: React Router DOM

### **DevOps & Cloud**
- **Containerization**: Docker multi-stage builds
- **Orchestration**: Docker Compose for service management
- **Environment**: Environment variable management
- **Cloud Ready**: Vercel deployment ready

## 🚀 **Quick Start**

### **Prerequisites**
- Docker and Docker Compose
- Node.js 16+ (for local development)
- Python 3.11+ (for local development)
- Google Gemini API key

### **Environment Setup**
1. Create `.env` file in root directory:
```bash
GEMINI_API_KEY=your-gemini-api-key
JWT_SECRET=your-jwt-secret-key
```

### **Docker Deployment (Recommended)**
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
# Start all services with one command
./start-services.sh

# Stop all services
./stop-services.sh
```

### **Manual Service Start**
```bash
# Start each service individually
cd services/ai-service && python app.py
cd services/analytics-service && python app.py
cd services/user-service && python app.py
cd services/api-gateway && python app.py

# Start frontend
cd frontend && npm start
```

## 📊 **Service Endpoints**

### **API Gateway (Port 5000)**
- `GET /api/gateway/health` - Gateway health check
- `GET /api/gateway/services` - Service status monitoring
- `GET /api/gateway/metrics` - Gateway performance metrics

### **AI Service (Port 5001)**
- `POST /api/ai/security-analysis` - Security vulnerability analysis
- `POST /api/ai/generate-tests` - Automated test generation
- `POST /api/ai/quality-prediction` - Code quality prediction
- `POST /api/ai/performance-optimization` - Performance suggestions

### **Analytics Service (Port 5002)**
- `POST /api/analytics/security-metrics` - Security metrics calculation
- `POST /api/analytics/quality-metrics` - Quality metrics calculation
- `GET /api/analytics/trends` - Trend analysis and reporting
- `GET /api/analytics/dashboard` - Comprehensive dashboard data

### **User Service (Port 5003)**
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `GET /api/users/profile` - User profile management
- `PUT /api/users/{id}/role` - Role management (admin)
- `GET /api/users/audit-logs` - Audit trail (admin)

## 🎯 **Interview Benefits**

### **Technical Sophistication**
- **Microservices Architecture**: Enterprise design patterns
- **Service Discovery**: Distributed systems knowledge
- **API Gateway**: Modern API management
- **Containerization**: Cloud deployment expertise

### **AI-SDLC Integration**
- **Advanced AI Features**: Security, testing, quality prediction
- **Real-time Analytics**: Comprehensive metrics and reporting
- **Multi-language Support**: Scalable AI integration
- **Performance Optimization**: AI-driven improvements

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
- Each service scales independently
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

## 📖 **Documentation**

- **[Microservices Architecture](MICROSERVICES_README.md)** - Detailed architecture documentation
- **[Service APIs](services/)** - Individual service documentation
- **[Docker Configuration](docker-compose.yml)** - Container orchestration
- **[Environment Setup](.env.example)** - Configuration examples

## 🚀 **Deployment**

### **Local Development**
```bash
./start-services.sh
```

### **Docker Production**
```bash
docker-compose up -d
```

### **Cloud Deployment (Vercel)**
```bash
# Frontend deployment
cd frontend && vercel --prod

# Backend services can be deployed to:
# - AWS ECS/Fargate
# - Google Cloud Run
# - Azure Container Instances
# - Heroku with Docker
```

This microservices architecture demonstrates **enterprise-grade development practices** perfect for showcasing your skills in a Nagarro Full Stack Developer interview! 🚀

## 📄 **License**

MIT License - see LICENSE file for details