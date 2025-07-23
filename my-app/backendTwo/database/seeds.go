package db
import (
	
	"gorm.io/gorm"
	"koplaybook.com/backend/models"
)

func Seed(db *gorm.DB) {
    // Seed Users
    users := []models.User{
        {FirstName: "Alice", LastName: "Smith", Location: "NY", UserAge: 30, Email: "alice@example.com", PhoneNumber: "1234567890", Password: "password1"},
        {FirstName: "Bob", LastName: "Johnson", Location: "CA", UserAge: 25, Email: "bob@example.com", PhoneNumber: "0987654321", Password: "password2"},
    }
    for _, user := range users {
        db.FirstOrCreate(&user, models.User{Email: user.Email})
    }

    // Seed Posts
    posts := []models.Posts{
        {UserID: 1, Content: "Hello, this is Alice's first post!"},
        {UserID: 2, Content: "Hello, this is Bob's first post!"},
    }
    for _, post := range posts {
        db.FirstOrCreate(&post, models.Posts{Content: post.Content})
    }
}