package models

import "time"

type User struct {
	ID uint	`json:"id" gorm:"primaryKey"`
	FirstName string `json:"firstname"`
	LastName string `json:"lastname"`
	UserName string `json:"username"`
	Location string `json:"location"`
	UserAge  int `json:"userage"`
	Email string `json:"email"`
	PhoneNumber string `json:"phonenumber"`
	Password string `json:"password"`

}

type Posts struct {
	ID uint	`json:"id" gorm:"primaryKey"`
	UserID uint   `json:"user_id"`
	UserName string `json:"username"`
	CreatedAt time.Time `json:"created_at"`
	Content string `json:"content" gorm:"type:text"`
}

type Bookmark struct {
	ID uint `json:"id" gorm:"primaryKey"`
	UserID uint `json:"user_id"`
	PostID uint `json:"post_id"`
	CreatedAt time.Time `json:"created_at"`
}

type Comment struct {
	ID uint	`json:"id" gorm:"primaryKey"`
	PostID uint `json:"post_id"`
	UserID uint `json:"user_id"`
	UserName string `json:"username"`
	CreatedAt time.Time `json:"created_at"`
	Content string `json:"content" gorm:"type:text"`
	ImageURL string `json:"image_url,omitempty"`
}

type Like struct {
	ID uint `json:"id" gorm:"primaryKey"`
	PostID uint `json:"post_id"`
	UserID uint `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
}