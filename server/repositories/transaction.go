package repositories

import (
	"dumbflix/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	CreateTransaction(transactions models.Transaction) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction) (models.Transaction, error)
	DeleteTransaction(transactoin models.Transaction) (models.Transaction, error)

	// Declare UpdateTransaction repository method ...

}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transactions models.Transaction
	err := r.db.Preload("User").First(&transactions, ID).Error

	return transactions, err
}

func (r *repository) CreateTransaction(transactions models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transactions).Error

	return transactions, err
}

// Create UpdateTransaction method ...
func (r *repository) UpdateTransaction(transaction models.Transaction) (models.Transaction, error) {

	err := r.db.Preload("User").Save(&transaction).Error

	return transaction, err
}

func (r *repository) DeleteTransaction(transactoin models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("User").Delete(&transactoin).Error

	return transactoin, err
}
