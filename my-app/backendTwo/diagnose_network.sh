#!/bin/bash

# Network Diagnostics for Kickoff Playbook
# Run this script when you have network issues

echo "=== Kickoff Playbook Network Diagnostics ==="
echo ""

# Get current IP addresses
echo "1. Current IP Addresses:"
ifconfig | grep "inet " | grep -v 127.0.0.1
echo ""

# Check if server is running
echo "2. Checking if backend server is running:"
if lsof -i:8080 > /dev/null 2>&1; then
    echo "✅ Server is running on port 8080"
    lsof -i:8080
else
    echo "❌ No server found on port 8080"
fi
echo ""

# Test connectivity to common IPs
echo "3. Testing connectivity:"
IPS=("10.0.13.209:8080" "192.168.1.73:8080" "localhost:8080")

for ip in "${IPS[@]}"; do
    echo -n "Testing $ip: "
    if curl -s --connect-timeout 3 "http://$ip/get/posts" > /dev/null 2>&1; then
        echo "✅ Working"
    else
        echo "❌ Failed"
    fi
done
echo ""

echo "4. Quick Fix Commands:"
echo "To restart server: cd /Users/Macry_Student/Development/Capstone/Kickoff-Playbook/my-app/backendTwo && ./start_server.sh"
echo "To kill port 8080: lsof -ti:8080 | xargs kill -9"
echo ""

echo "=== End Diagnostics ==="
