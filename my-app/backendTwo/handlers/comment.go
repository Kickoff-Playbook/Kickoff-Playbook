package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"koplaybook.com/backend/models"
)

// Create comment
func (h handler) CreateComment(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var comment models.Comment
	if err := json.NewDecoder(r.Body).Decode(&comment); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	// Set the creation time
	comment.CreatedAt = time.Now()

	if err := h.DB.Create(&comment).Error; err != nil {
		http.Error(w, "Could not create comment", http.StatusInternalServerError)
		return
	}

	// Create response
	response := map[string]interface{}{
		"id":         comment.ID,
		"post_id":    comment.PostID,
		"user_id":    comment.UserID,
		"username":   comment.UserName,
		"content":    comment.Content,
		"image_url":  comment.ImageURL,
		"created_at": comment.CreatedAt,
		"message":    "Comment created successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

// Get comments for a specific post
func (h handler) GetCommentsByPost(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Extract post ID from URL path /get/comments/{post_id}
	postIDStr := strings.TrimPrefix(r.URL.Path, "/get/comments/")
	if postIDStr == "" || postIDStr == r.URL.Path {
		http.Error(w, "Post ID required", http.StatusBadRequest)
		return
	}

	postID, err := strconv.Atoi(postIDStr)
	if err != nil || postID < 1 {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	var comments []models.Comment
	if err := h.DB.Where("post_id = ?", postID).Order("created_at ASC").Find(&comments).Error; err != nil {
		http.Error(w, "Could not fetch comments", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(comments)
}

// Delete comment
func (h handler) DeleteComment(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Extract comment ID from URL path /delete/comment/{id}
	idStr := strings.TrimPrefix(r.URL.Path, "/delete/comment/")
	if idStr == "" || idStr == r.URL.Path {
		http.Error(w, "Comment ID required", http.StatusBadRequest)
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil || id < 1 {
		http.Error(w, "Invalid comment ID", http.StatusBadRequest)
		return
	}

	// Check if comment exists
	var comment models.Comment
	if err := h.DB.First(&comment, id).Error; err != nil {
		http.Error(w, "Comment not found", http.StatusNotFound)
		return
	}

	// Delete the comment
	if err := h.DB.Delete(&comment, id).Error; err != nil {
		http.Error(w, "Could not delete comment", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
