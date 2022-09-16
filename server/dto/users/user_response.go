package usersdto

type UserResponse struct {
	ID        int    `json:"id"`
	FullName  string `json:"fullname" form:"fullname" validate:"required"`
	Email     string `json:"email" form:"email" validate:"required"`
	Password  string `json:"password" form:"password" validate:"required"`
	Gender    string `json:"gender" form:"gender" validate:"required"`
	Phone     int    `json:"phone" form:"phone"`
	Address   string `json:"address" form:"address"`
	Subscribe bool   `json:"subscribe" form:"subscribe"`
	Status    string `json:"status" form:"status"`
}
