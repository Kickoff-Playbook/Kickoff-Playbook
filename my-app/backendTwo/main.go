package main

import (
	"fmt"
	"net/http"

	"koplaybook.com/backend/database"
	"koplaybook.com/backend/handlers"
)



func main() {
	db := database.Init()
    database.Seed(db)

	
	h := handlers.New(db)

 	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
        if r.Method == http.MethodPost {
            h.CreateUser(w, r)
            return
        }
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    })

	http.HandleFunc("/users/", func(w http.ResponseWriter, r *http.Request) {
        if r.Method == http.MethodDelete {
            h.DeleteUser(w, r)
            return
        }
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    })

	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodGet {
        h.LoginUser(w, r)
        return
    }
    http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
})

// 	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
//     w.Write([]byte("OK"))
// })











	///////////////////////////////////////
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        fmt.Println("ERROR! This server can not be used at this time")
    }
}