package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"koplaybook.com/backend/models"
)

func (h handler) CreateUser(w http.ResponseWriter, r *http.Request){
    // Add CORS headers
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    
    if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }

    var user models.User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, "Invalid input", http.StatusBadRequest)
        return
    }
    if err := h.DB.Create(&user).Error; err != nil {
        http.Error(w, "Could not Create User", http.StatusInternalServerError)
        return
    }
    
    // Create a clean response without potential circular references
    response := map[string]interface{}{
        "id": user.ID,
        "firstname": user.FirstName,
        "lastname": user.LastName,
        "username": user.UserName,
        "location": user.Location,
        "userage": user.UserAge,
        "email": user.Email,
        "phonenumber": user.PhoneNumber,
        "message": "Welcome to The Playbook",
    }
    
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(response)
}
// 
func (h handler) DeleteUser(w http.ResponseWriter, r *http.Request) {
    // Add CORS headers
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    
    // Handle preflight OPTIONS request
    if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }
    
    // Expecting URL: /users/{id}
    idStr := strings.TrimPrefix(r.URL.Path, "/users/")
    
    // Check if ID string is empty
    if idStr == "" {
        http.Error(w, "User ID is required", http.StatusBadRequest)
        return
    }
    
    id, err := strconv.Atoi(idStr)
    if err != nil || id < 1 {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }
    
    // Check if user exists before deleting
    var user models.User
    if err := h.DB.First(&user, id).Error; err != nil {
        if err.Error() == "record not found" {
            http.Error(w, "User not found", http.StatusNotFound)
            return
        }
        http.Error(w, "Database error", http.StatusInternalServerError)
        return
    }
    
    // Delete the user
    if err := h.DB.Delete(&models.User{}, id).Error; err != nil {
        http.Error(w, "Could not delete user", http.StatusInternalServerError)
        return
    }
    
    w.WriteHeader(http.StatusNoContent)
}
// 
func (h handler) LoginUser(w http.ResponseWriter, r *http.Request){
    // Fix CORS headers - should allow all origins for testing
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

    var login struct {
        Username string `json:"username"`
        Email    string `json:"email"`
        Password string `json:"password"`
    }
    
    if err := json.NewDecoder(r.Body).Decode(&login); err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    if (login.Username == "" && login.Email == "") || login.Password == "" {
        http.Error(w, "Username or email and password required", http.StatusBadRequest)
        return
    }

    var user models.User
    var err error
    
    if login.Username != "" {
        err = h.DB.Where("user_name = ? AND password = ?", login.Username, login.Password).First(&user).Error
    } else {
        err = h.DB.Where("email = ? AND password = ?", login.Email, login.Password).First(&user).Error
    }

    if err != nil {
        http.Error(w, "Invalid credentials", http.StatusUnauthorized)
        return
    }

    // Create response
    response := map[string]interface{}{
        "id":       user.ID,
        "username": user.UserName,
        "email":    user.Email,
        "message":  "The Odds are Waiting.",
    }
    
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(response)
}