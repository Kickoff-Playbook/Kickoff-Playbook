package handlers

import (
	"encoding/json"
	"encoding/base64"
	"fmt"
	"os"
	"net/http"
	"path/filepath"
	"time"
)

type UploadRequest struct {
	Image    string `json:"image"`
	Filename string `json:"filename"`
}

type UploadResponse struct {
	URL string `json:"url"`
}

// UploadImage handles image upload and returns a public URL
func (h *handler) UploadImage(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse JSON request
	var req UploadRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// Decode base64 image
	imageData, err := base64.StdEncoding.DecodeString(req.Image)
	if err != nil {
		http.Error(w, "Invalid base64 image", http.StatusBadRequest)
		return
	}

	// Create uploads directory if it doesn't exist
	uploadsDir := "uploads"
	if err := os.MkdirAll(uploadsDir, 0755); err != nil {
		http.Error(w, "Failed to create uploads directory", http.StatusInternalServerError)
		return
	}

	// Generate unique filename
	timestamp := time.Now().Unix()
	filename := fmt.Sprintf("%d_%s", timestamp, req.Filename)
	filePath := filepath.Join(uploadsDir, filename)

	// Write file to disk
	if err := os.WriteFile(filePath, imageData, 0644); err != nil {
		http.Error(w, "Failed to save image", http.StatusInternalServerError)
		return
	}

	// Return the public URL (you'll need to serve static files)
	// Get the host from the request to make it dynamic
	host := r.Host
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	imageURL := fmt.Sprintf("%s://%s/uploads/%s", scheme, host, filename)

	response := UploadResponse{
		URL: imageURL,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
