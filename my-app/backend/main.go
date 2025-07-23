package main

import (
	"fmt"
	"net/http"
	"gorm.io/driver/postgres"
   "gorm.io/gorm"
   "my-app/backend/models" 
)

//

func handleHello(w http.ResponseWriter, r *http.Request){
	// when you visit this url , it will be handled by this function
	// w = write, r = request 
		// writes data to the connection part of of HTTP reply 
		w.Write([]byte("wait to fill out"))
	

}







// ...existing code...

func main() {
    // Connect to Postgres
    dsn := "host=localhost user=Macry_Student password=TimeToLearn882 dbname=Capstone_KickoffPlaybook port=5433 sslmode=disable"
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    // Run migrations
    db.AutoMigrate(&models.User{}, &models.Posts{}, &models.Bookmark{})
	 if err := db.AutoMigrate(&models.User{}, &models.Posts{}, &models.Bookmark{}); err != nil {
        panic(fmt.Sprintf("Migration failed: %v", err))
    }

    // ...your server code...
    server := http.NewServeMux()
    server.HandleFunc("/hello", handleHello)
    fs := http.FileServer(http.Dir("./backend/data"))
    server.Handle("/", fs)

    err2 := http.ListenAndServe(":8080", server)
    if err2 != nil {
        fmt.Println("ERROR! This server can not be used at this time")
    }
}
