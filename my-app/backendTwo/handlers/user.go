package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"koplaybook.com/backend/models"
)

func (h handler) CreateUser(w http.ResponseWriter, r *http.Request){
	  var user models.User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, "Invalid input", http.StatusBadRequest)
        return
    }
    if err := h.DB.Create(&user).Error; err != nil {
        http.Error(w, "Could not create user", http.StatusInternalServerError)
        return
    }
    
    // Create a clean response without potential circular references
    response := map[string]interface{}{
        "id": user.ID,
        "firstname": user.FirstName,
        "lastname": user.LastName,
        "location": user.Location,
        "userage": user.UserAge,
        "email": user.Email,
        "phonenumber": user.PhoneNumber,
        "message": "User created successfully",
    }
    
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(response)
}

func (h handler) DeleteUser(w http.ResponseWriter, r *http.Request) {
    // Expecting URL: /users/{id}
    idStr := strings.TrimPrefix(r.URL.Path, "/users/")
    id, err := strconv.Atoi(idStr)
    if err != nil || id < 1 {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }
    if err := h.DB.Delete(&models.User{}, id).Error; err != nil {
        http.Error(w, "Could not delete user", http.StatusInternalServerError)
        return
    }
    w.WriteHeader(http.StatusNoContent)
}

func (h handler) LoginUser(w http.ResponseWriter, r *http.Request){
	 // Accept username or email as login, plus password
    username := r.URL.Query().Get("username")
    email := r.URL.Query().Get("email")
    password := r.URL.Query().Get("password")

    if (username == "" && email == "") || password == "" {
        http.Error(w, "Username or email and password required", http.StatusBadRequest)
        return
    }

    var user models.User
    var err error

    if username != "" {
        err = h.DB.Where("first_name = ? AND password = ?", username, password).First(&user).Error
    } else {
        err = h.DB.Where("email = ? AND password = ?", email, password).First(&user).Error
    }

    if err != nil {
        http.Error(w, "Invalid credentials", http.StatusUnauthorized)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(user)
}