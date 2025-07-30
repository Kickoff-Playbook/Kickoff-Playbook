package database 

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"koplaybook.com/backend/models"
)

func Init() *gorm.DB{
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://Macry_Student:ko1234@localhost:5433/koPlaybook?sslmode=disable"

	}

	database, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})

	if err != nil {
		log.Fatalln("failed to connect to database", err)
	}

	err = database.AutoMigrate(&models.User{}, &models.Bookmark{}, &models.Posts{})
	if err != nil{
		log.Fatalln("failed to migrate database:", err)
	}
	return  database
}
