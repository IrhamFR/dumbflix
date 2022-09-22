package transactionsdto

import "dumbflix/models"

type TransactionRequest struct {
	ID        int                 `json:"id" validate:"required"`
	StartDate string              `json:"startDate" form:"startDate" gorm:"type: varchar(255)"`
	DueDate   string              `json:"dueDate" form:"dueDate" gorm:"type:varchar(255)"`
	User      models.UserResponse `json:"user"`
	UserID    int                 `json:"user_id" form:"user_id" gorm:"-"`
	Attache   string              `json:"attache" form:"attache" gorm:"type: varchar(255)"`
	Status    string              `json:"status" form:"status" gorm:"type: varchar(255)"`
}

type TransactionUpdateRequest struct {
	StartDate string              `json:"startDate" form:"startDate" gorm:"type: varchar(255)"`
	DueDate   string              `json:"dueDate" form:"dueDate" gorm:"type:varchar(255)"`
	UserID    int                 `json:"user_id" form:"user_id" gorm:"-"`
	User      models.UserResponse `json:"user"`
	Attache   string              `json:"attache" form:"attache" gorm:"type: varchar(255)"`
	Status    string              `json:"status" form:"status" gorm:"type: varchar(255)"`
}

// type TransactionRequest struct {
// 	StartDate string `json:"startDate"`
// 	DueDate   string `json:"dueDate"`
// 	UserID    int    `json:"user_id" form:"user_id"`
// 	Attache   string `json:"attache" gorm:"type:varchar(50)" validate:"required"`
// 	Status    string `json:"status"`
// }

// type CreatTransactionRequest struct {
// 	StartDate string `json:"startDate"`
// 	DueDate   string `json:"dueDate"`
// 	UserID    int    `json:"user_id" form:"user_id"`
// 	Attache   string `json:"attache" gorm:"type:varchar(50)" validate:"required"`
// 	Status    string `json:"status"`
// }

// type UpdateTransactionRequest struct {
// 	StartDate string `json:"startDate"`
// 	DueDate   string `json:"dueDate"`
// 	UserID    int    `json:"user_id" form:"user_id"`
// 	Attache   string `json:"attache" gorm:"type:varchar(50)" validate:"required"`
// 	Status    string `json:"status"`
// }
