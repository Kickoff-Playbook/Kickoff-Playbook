package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"koplaybook.com/backend/models"
)

// create
func (h handler) CreatePost(w http.ResponseWriter, r *http.Request){
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    
    if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }

    var post models.Posts
    if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
        http.Error(w, "Invalid input", http.StatusBadRequest)
        return
    }

    // Set the creation time
    post.CreatedAt = time.Now()

    if err := h.DB.Create(&post).Error; err != nil {
        http.Error(w, "Could not create post", http.StatusInternalServerError)
        return
    }

    // Create response
    response := map[string]interface{}{
        "id":         post.ID,
        "user_id":    post.UserID,
        "content":    post.Content,
        "created_at": post.CreatedAt,
        "message":    "Post created successfully",
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(response)
}
// get 
func (h handler) GetPost(w http.ResponseWriter, r *http.Request){
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    
    if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }

    // Extract post ID from URL path /get/post/{id}
    idStr := strings.TrimPrefix(r.URL.Path, "/get/post/")
    if idStr == "" || idStr == r.URL.Path {
        http.Error(w, "Post ID required", http.StatusBadRequest)
        return
    }

    id, err := strconv.Atoi(idStr)
    if err != nil || id < 1 {
        http.Error(w, "Invalid post ID", http.StatusBadRequest)
        return
    }

    var post models.Posts
    if err := h.DB.First(&post, id).Error; err != nil {
        http.Error(w, "Post not found", http.StatusNotFound)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(post)
}
// update 
func (h handler) UpdatePost(w http.ResponseWriter, r *http.Request){
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PATCH, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    
    if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }

    // Extract post ID from URL path /update/post/{id}
    idStr := strings.TrimPrefix(r.URL.Path, "/update/post/")
    if idStr == "" || idStr == r.URL.Path {
        http.Error(w, "Post ID required", http.StatusBadRequest)
        return
    }

    id, err := strconv.Atoi(idStr)
    if err != nil || id < 1 {
        http.Error(w, "Invalid post ID", http.StatusBadRequest)
        return
    }

    // Check if post exists
    var existingPost models.Posts
    if err := h.DB.First(&existingPost, id).Error; err != nil {
        http.Error(w, "Post not found", http.StatusNotFound)
        return
    }

    // Decode the updated data
    var updateData struct {
        Content string `json:"content"`
    }
    if err := json.NewDecoder(r.Body).Decode(&updateData); err != nil {
        http.Error(w, "Invalid input", http.StatusBadRequest)
        return
    }

    // Update the post
    existingPost.Content = updateData.Content
    if err := h.DB.Save(&existingPost).Error; err != nil {
        http.Error(w, "Could not update post", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(existingPost)
}
// delete
func (h handler) DeletePost(w http.ResponseWriter, r *http.Request){
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    
    if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }

    // Extract post ID from URL path /delete/post/{id}
    idStr := strings.TrimPrefix(r.URL.Path, "/delete/post/")
    if idStr == "" || idStr == r.URL.Path {
        http.Error(w, "Post ID required", http.StatusBadRequest)
        return
    }

    id, err := strconv.Atoi(idStr)
    if err != nil || id < 1 {
        http.Error(w, "Invalid post ID", http.StatusBadRequest)
        return
    }

    // Check if post exists
    var post models.Posts
    if err := h.DB.First(&post, id).Error; err != nil {
        http.Error(w, "Post not found", http.StatusNotFound)
        return
    }

    // Delete the post
    if err := h.DB.Delete(&post, id).Error; err != nil {
        http.Error(w, "Could not delete post", http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusNoContent)
}

// get all posts
func (h handler) GetAllPosts(w http.ResponseWriter, r *http.Request){
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    
    if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }

    var posts []models.Posts
    if err := h.DB.Order("created_at DESC").Find(&posts).Error; err != nil {
        http.Error(w, "Could not fetch posts", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(posts)
}