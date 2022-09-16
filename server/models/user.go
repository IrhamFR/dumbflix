package models

import "time"

type User struct {
	ID        int       `json:"id"`
	FullName  string    `json:"fullname" gorm:"type: varchar(255)"`
	Email     string    `json:"email" gorm:"type: varchar(255)"`
	Password  string    `json:"password" gorm:"type: varchar(255)"`
	Gender    string    `json:"gender" gorm:"type:varchar(50)"`
	Phone     int       `json:"phone" gorm:"type:int"`
	Address   string    `json:"address" gorm:"type:varchar(225)"`
	Subscribe bool      `json:"subscribe" gorm:"type:varchar(50)"`
	Status    string    `json:"status" gorm:"type: varchar(50)"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
