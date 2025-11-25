package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"koplaybook.com/backend/models"
)

// ToggleBookmark handles POST /toggle/bookmark/{post_id}
func (h handler) ToggleBookmark(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Extract post ID from URL path /toggle/bookmark/{post_id}
	postIDStr := strings.TrimPrefix(r.URL.Path, "/toggle/bookmark/")
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

	// Check if the bookmark already exists
	var existingBookmark models.Bookmark
	result := h.DB.Where("post_id = ? AND user_id = ?", postID, requestData.UserID).First(&existingBookmark)

	if result.Error == nil {
		// Bookmark exists, so remove it (unbookmark)
		if err := h.DB.Delete(&existingBookmark).Error; err != nil {
			http.Error(w, "Failed to remove bookmark", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":    "Bookmark removed successfully",
			"bookmarked": false,
		})
	} else {
		// Bookmark doesn't exist, so create a new bookmark
		newBookmark := models.Bookmark{
			PostID:    uint(postID),
			UserID:    uint(requestData.UserID),
			CreatedAt: time.Now(),
		}

		if err := h.DB.Create(&newBookmark).Error; err != nil {
			http.Error(w, "Failed to create bookmark", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":    "Post bookmarked successfully",
			"bookmarked": true,
		})
	}
}

// GetBookmarksByPost handles GET /get/bookmarks/{post_id}?user_id={user_id}
func (h handler) GetBookmarksByPost(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Extract post ID from URL path /get/bookmarks/{post_id}
	postIDStr := strings.TrimPrefix(r.URL.Path, "/get/bookmarks/")
	if postIDStr == "" || postIDStr == r.URL.Path {
		http.Error(w, "Post ID is required", http.StatusBadRequest)
		return
	}

	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	var bookmarks []models.Bookmark
	if err := h.DB.Where("post_id = ?", postID).Find(&bookmarks).Error; err != nil {
		http.Error(w, "Failed to get bookmarks", http.StatusInternalServerError)
		return
	}

	// Get bookmark count
	bookmarkCount := len(bookmarks)

	// Check if current user bookmarked this post (if user_id is provided in query)
	userIDStr := r.URL.Query().Get("user_id")
	var userBookmarked bool = false

	if userIDStr != "" {
		userID, err := strconv.Atoi(userIDStr)
		if err == nil {
			for _, bookmark := range bookmarks {
				if bookmark.UserID == uint(userID) {
					userBookmarked = true
					break
				}
			}
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"post_id":          postID,
		"bookmark_count":   bookmarkCount,
		"user_bookmarked": userBookmarked,
		"bookmarks":       bookmarks,
	})
}

// GetUserBookmarks handles GET /get/user/bookmarks/{user_id}
func (h handler) GetUserBookmarks(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Extract user ID from URL path /get/user/bookmarks/{user_id}
	userIDStr := strings.TrimPrefix(r.URL.Path, "/get/user/bookmarks/")
	if userIDStr == "" || userIDStr == r.URL.Path {
		http.Error(w, "User ID is required", http.StatusBadRequest)
		return
	}

	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	// Get all bookmarks for the user
	var bookmarks []models.Bookmark
	if err := h.DB.Where("user_id = ?", userID).Order("created_at DESC").Find(&bookmarks).Error; err != nil {
		http.Error(w, "Failed to fetch bookmarks", http.StatusInternalServerError)
		return
	}

	// Get the posts for each bookmark
	var bookmarkedPosts []models.Posts
	for _, bookmark := range bookmarks {
		var post models.Posts
		if err := h.DB.First(&post, bookmark.PostID).Error; err == nil {
			bookmarkedPosts = append(bookmarkedPosts, post)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(bookmarkedPosts)
}
