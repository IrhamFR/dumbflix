package usersdto

type CreateUserRequest struct {
	FullName  string `json:"fullname" form:"fullname" validate:"required"`
	Email     string `json:"email" form:"email" validate:"required"`
	Password  string `json:"password" form:"password" validate:"required"`
	Gender    string `json:"gender" form:"gender" validate:"required"`
	Phone     string `json:"phone" form:"phone"`
	Address   string `json:"address" form:"address"`
	Subscribe string `json:"subscribe" form:"subscribe" validate:"required"`
	Status    string `json:"status" form:"status"`
	Role      string `json:"role" gorm:"type: varchar(255)"`
}

type UpdateUserRequest struct {
	FullName  string `json:"fullname" form:"fullname"`
	Email     string `json:"email" form:"email"  validate:"required"`
	Password  string `json:"password" form:"password"`
	Gender    string `json:"gender" form:"gender"`
	Phone     string `json:"phone" form:"phone"`
	Address   string `json:"address" form:"address"`
	Subscribe string `json:"subscribe" form:"subscribe"`
	Status    string `json:"status" form:"status"`
	Role      string `json:"role" gorm:"type: varchar(255)"`
}
