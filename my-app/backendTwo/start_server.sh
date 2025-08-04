#!/bin/bash

# Script to start and monitor the Go backend server
# This will restart the server automatically if it crashes

SERVER_DIR="/Users/Macry_Student/Development/Capstone/Kickoff-Playbook/my-app/backendTwo"
LOG_FILE="$SERVER_DIR/server.log"

echo "Starting Kickoff Playbook Backend Server..."
echo "Log file: $LOG_FILE"
echo "Server directory: $SERVER_DIR"

cd "$SERVER_DIR"

# Function to start the server
start_server() {
    echo "$(date): Starting server..." >> "$LOG_FILE"
    go run main.go >> "$LOG_FILE" 2>&1 &
    SERVER_PID=$!
    echo "$(date): Server started with PID: $SERVER_PID" >> "$LOG_FILE"
}

# Function to check if server is running
is_server_running() {
    curl -s http://localhost:8080/get/posts > /dev/null 2>&1
    return $?
}

# Kill any existing servers on port 8080
echo "Killing existing servers on port 8080..."
lsof -ti:8080 | xargs kill -9 2>/dev/null

# Start the server
start_server

echo "Server monitoring started. Check $LOG_FILE for logs."
echo "To stop the server, run: kill $SERVER_PID"
echo "Server PID: $SERVER_PID"

# Optional: Monitor and restart (uncomment if you want auto-restart)
# while true; do
#     sleep 30
#     if ! is_server_running; then
#         echo "$(date): Server is down, restarting..." >> "$LOG_FILE"
#         start_server
#     fi
# done
