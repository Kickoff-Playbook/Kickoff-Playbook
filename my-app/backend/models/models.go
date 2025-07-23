package models
import "time"
type User struct {
	ID uint	`gorm:"primaryKey"`
	FirstName string
	LastName string 
	Location string 
	UserAge  int
	Email string 
	PhoneNumber string
	Password string
	Posts []Posts `gorm:"foreignKey:UserID"`
}
type Posts struct {
	ID uint	`gorm:"primaryKey"`
	UserID uint
	CreatedAt time.Time 
	Content string `gorm:"type:text"`

}
type Bookmark struct {
	ID uint	`gorm:"primaryKey"`
	UserId uint
	PostId  int
}