package authdto

type LoginResponse struct {
	Email string `gorm:"type: varchar(225)" json:"email"`
	Token string `gorm:"type: varchar(255)" json:"token"`
}

type CheckAuthResponse struct {
	Status string `json:"status"`
}

type RegisterResponse struct {
	Email string `gorm:"type: varchar(225)" json:"email"`
	Token string `gorm:"type: varchar(255)" json:"token"`
}
