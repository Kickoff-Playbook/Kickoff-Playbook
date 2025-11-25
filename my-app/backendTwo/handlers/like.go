package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"koplaybook.com/backend/models"
)

func (h handler) ToggleLike(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Extract post ID from URL path /toggle/like/{post_id}
	postIDStr := strings.TrimPrefix(r.URL.Path, "/toggle/like/")
	if postIDStr == "" || postIDStr == r.URL.Path {
		http.Error(w, "Post ID is required", http.StatusBadRequest)
		return
	}

	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	var requestData struct {
		UserID int `json:"user_id"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Check if the like already exists
	var existingLike models.Like
	result := h.DB.Where("post_id = ? AND user_id = ?", postID, requestData.UserID).First(&existingLike)

	if result.Error == nil {
		// Like exists, so unlike (delete the like)
		if err := h.DB.Delete(&existingLike).Error; err != nil {
			http.Error(w, "Failed to unlike post", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Post unliked successfully",
			"liked": false,
		})
	} else {
		// Like doesn't exist, so create a new like
		newLike := models.Like{
			PostID:    uint(postID),
			UserID:    uint(requestData.UserID),
			CreatedAt: time.Now(),
		}

		if err := h.DB.Create(&newLike).Error; err != nil {
			http.Error(w, "Failed to like post", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Post liked successfully",
			"liked": true,
		})
	}
}

func (h handler) GetLikesByPost(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Extract post ID from URL path /get/likes/{post_id}
	postIDStr := strings.TrimPrefix(r.URL.Path, "/get/likes/")
	if postIDStr == "" || postIDStr == r.URL.Path {
		http.Error(w, "Post ID is required", http.StatusBadRequest)
		return
	}

	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	var likes []models.Like
	if err := h.DB.Where("post_id = ?", postID).Find(&likes).Error; err != nil {
		http.Error(w, "Failed to get likes", http.StatusInternalServerError)
		return
	}

	// Get like count
	likeCount := len(likes)

	// Check if current user liked this post (if user_id is provided in query)
	userIDStr := r.URL.Query().Get("user_id")
	var userLiked bool = false
	
	if userIDStr != "" {
		userID, err := strconv.Atoi(userIDStr)
		if err == nil {
			for _, like := range likes {
				if like.UserID == uint(userID) {
					userLiked = true
					break
				}
			}
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"post_id": postID,
		"like_count": likeCount,
		"user_liked": userLiked,
		"likes": likes,
	})
}
