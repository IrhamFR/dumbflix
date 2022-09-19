package authdto

type LoginResponse struct {
	FullName string `gorm:"type: varchar(255)" json:"fullname" validate:"required"`
	Email    string `gorm:"type: varchar(225)" json:"email" validate:"required"`
	Gender   string `json:"gender" form:"gender" validate:"required"`
	Phone    int    `json:"phone" form:"phone"`
	Address  string `json:"address" form:"address"`
	Status   string `json:"status" form:"status"`
	Token    string `gorm:"type: varchar(255)" json:"token"`
}

type CheckAuthResponse struct {
	Id       int    `gorm:"type: int" json:"id"`
	FullName string `gorm:"type: varchar(255)" json:"name"`
	Email    string `gorm:"type: varchar(255)" json:"email"`
	Status   string `gorm:"type: varchar(50)"  json:"status"`
}

// type RegisterResponse struct {
// 	Email string `gorm:"type: varchar(225)" json:"email"`
// 	Token string `gorm:"type: varchar(255)" json:"token"`
// }
