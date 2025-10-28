#!/bin/bash

# AI Code Review Assistant - Microservices Startup Script
# This script starts all microservices for the AI Code Review Assistant

echo "🚀 Starting AI Code Review Assistant - Microservices Architecture"
echo "================================================================"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create one with your API keys:"
    echo "   GEMINI_API_KEY=your-gemini-api-key"
    echo "   JWT_SECRET=your-jwt-secret-key"
    exit 1
fi

# Function to start a service
start_service() {
    local service_name=$1
    local service_path=$2
    local port=$3
    
    echo "📦 Starting $service_name on port $port..."
    cd "$service_path"
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        echo "   Creating virtual environment..."
        python -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null
    
    # Install requirements
    echo "   Installing requirements..."
    pip install -r requirements.txt > /dev/null 2>&1
    
    # Start service in background
    python app.py &
    local pid=$!
    echo "   ✅ $service_name started with PID $pid"
    
    cd - > /dev/null
    echo $pid > "${service_name}.pid"
}

# Function to check if port is available
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "   ⚠️  Port $port is already in use"
        return 1
    fi
    return 0
}

# Start services
echo ""
echo "🔧 Starting Microservices..."

# Start AI Service
if check_port 5001; then
    start_service "ai-service" "services/ai-service" 5001
else
    echo "   ⚠️  AI Service port 5001 is busy, skipping..."
fi

# Start Analytics Service
if check_port 5002; then
    start_service "analytics-service" "services/analytics-service" 5002
else
    echo "   ⚠️  Analytics Service port 5002 is busy, skipping..."
fi

# Start User Service
if check_port 5003; then
    start_service "user-service" "services/user-service" 5003
else
    echo "   ⚠️  User Service port 5003 is busy, skipping..."
fi

# Start API Gateway
if check_port 5000; then
    start_service "api-gateway" "services/api-gateway" 5000
else
    echo "   ⚠️  API Gateway port 5000 is busy, skipping..."
fi

# Start Frontend
echo ""
echo "🎨 Starting Frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "   Installing npm dependencies..."
    npm install > /dev/null 2>&1
fi

if check_port 3000; then
    npm start &
    frontend_pid=$!
    echo "   ✅ Frontend started with PID $frontend_pid"
    echo $frontend_pid > "frontend.pid"
else
    echo "   ⚠️  Frontend port 3000 is busy, skipping..."
fi

cd ..

echo ""
echo "🎉 All services started successfully!"
echo ""
echo "📊 Service Status:"
echo "   • API Gateway:     http://localhost:5000"
echo "   • AI Service:      http://localhost:5001"
echo "   • Analytics:       http://localhost:5002"
echo "   • User Service:    http://localhost:5003"
echo "   • Frontend:        http://localhost:3000"
echo ""
echo "🔍 Health Checks:"
echo "   • Gateway Health:  http://localhost:5000/api/gateway/health"
echo "   • Service Status:  http://localhost:5000/api/gateway/services"
echo ""
echo "📝 To stop all services, run: ./stop-services.sh"
echo "📖 For more info, see: MICROSERVICES_README.md"









