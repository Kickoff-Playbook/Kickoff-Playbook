package main

import (
	"fmt"
	"net/http"

	 "koplaybook.com/backend/database"
	"koplaybook.com/backend/handlers"
)

func main() {
	db := db.Init()
	h := handlers.New(db)

 http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
        if r.Method == http.MethodPost {
            h.CreateUser(w, r)
            return
        }
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    })

    err := http.ListenAndServe(":5433", nil)
    if err != nil {
        fmt.Println("ERROR! This server can not be used at this time")
    }
}