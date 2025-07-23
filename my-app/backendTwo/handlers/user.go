package handlers

import (
	"encoding/json"
	"net/http"
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
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}