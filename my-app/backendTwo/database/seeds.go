package database 
import (
	
	"gorm.io/gorm"
	"koplaybook.com/backend/models"
)

func Seed(db *gorm.DB) {
    // Seed Users
    users := []models.User{
        {FirstName: "Alice", LastName: "Smith", UserName: "ASmith", Location: "NY", UserAge: 30, Email: "alice@example.com", PhoneNumber: "1234567890", Password: "password1"},
        {FirstName: "Bob", LastName: "Johnson",  UserName: "BJohnson", Location: "CA", UserAge: 25, Email: "bob@example.com", PhoneNumber: "0987654321", Password: "password2"},
        {FirstName: "Jimmy", LastName: "Jam", UserName: "JJammmz", Location: "GA", UserAge: 40, Email: "JJ@example.com", PhoneNumber: "5647869902", Password: "pass"},
    }
    for _, user := range users {
        db.FirstOrCreate(&user, models.User{Email: user.Email})
    }

    // Seed Posts
    posts := []models.Posts{
        {UserID: 1, Content:  "New to sports betting? Start with moneyline bets! You're simply picking the winner of the game. No point spreads or complicated odds."},
        {UserID: 2, Content: "Always manage your bankroll. Only bet what you can afford to lose, and consider using units (like 1% of your balance) to keep things consistent."},
        {UserID: 3, Content: "Understand the odds: +150 means you win $150 on a $100 bet. -150 means you need to bet $150 to win $100. Mastering this is key to long-term success."},
        
    }
    for _, post := range posts {
        db.FirstOrCreate(&post, models.Posts{Content: post.Content})
    }
}