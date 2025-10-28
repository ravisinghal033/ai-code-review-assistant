#!/bin/bash

# AI Code Review Assistant - Stop Services Script
# This script stops all running microservices

echo "🛑 Stopping AI Code Review Assistant Services"
echo "============================================="

# Function to stop service by PID file
stop_service() {
    local service_name=$1
    local pid_file="${service_name}.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if kill -0 "$pid" 2>/dev/null; then
            echo "🔄 Stopping $service_name (PID: $pid)..."
            kill "$pid"
            rm "$pid_file"
            echo "   ✅ $service_name stopped"
        else
            echo "   ⚠️  $service_name was not running"
            rm "$pid_file"
        fi
    else
        echo "   ⚠️  No PID file found for $service_name"
    fi
}

# Stop all services
echo ""
echo "🔧 Stopping Microservices..."

stop_service "ai-service"
stop_service "analytics-service"
stop_service "user-service"
stop_service "api-gateway"
stop_service "frontend"

echo ""
echo "🧹 Cleaning up any remaining processes..."

# Kill any remaining Python processes on our ports
for port in 5000 5001 5002 5003; do
    pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        echo "   Killing process on port $port (PID: $pid)"
        kill -9 "$pid" 2>/dev/null
    fi
done

# Kill any remaining Node processes on port 3000
pid=$(lsof -ti:3000 2>/dev/null)
if [ ! -z "$pid" ]; then
    echo "   Killing frontend process on port 3000 (PID: $pid)"
    kill -9 "$pid" 2>/dev/null
fi

echo ""
echo "✅ All services stopped successfully!"
echo ""
echo "💡 To start services again, run: ./start-services.sh"









