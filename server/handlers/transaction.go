package handlers

import (
	dto "dumbflix/dto/result"
	transactionsdto "dumbflix/dto/transaction"
	"dumbflix/models"
	"dumbflix/repositories"
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
	// "github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
)

var c = coreapi.Client{
	ServerKey: os.Getenv("SERVER_KEY"),
	ClientKey: os.Getenv("CLIENT_KEY"),
}

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository}
}

func (h *handlerTransaction) FindTransactions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	transactions, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	// transactions, err := h.TransactionRepository.FindTransactions()
	// for i, transaction := range transactions {
	// 	transactions[i].Attache = os.Getenv("PATH_FILE") + transaction.Attache
	// }
	// userInfo := r.Context().Value(string("userInfo")).(jwt.MapClaims)
	// userInfoStatus := userInfo["status"].(string)
	// userInfoId := userInfo["id"].(float64)

	// if userInfoStatus == "Admin" {
	// 	transactionByUserId, err := h.TransactionRepository.FindTransactionsByUserId(int(userInfoId))

	// 	for i, transaction := range transactionByUserId {
	// 		transactionByUserId[i].Attache = os.Getenv("PATH_FILE") + transaction.Attache
	// 	}
	// 	if err != nil {
	// 		w.WriteHeader(http.StatusInternalServerError)
	// 		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
	// 		json.NewEncoder(w).Encode(response)
	// 		return
	// 	}
	// 	w.WriteHeader(http.StatusOK)
	// 	response := dto.SuccessResult{Code: http.StatusOK, Data: transactionByUserId}
	// 	json.NewEncoder(w).Encode(response)
	// 	return
	// }

	// if err != nil {
	// 	w.WriteHeader(http.StatusInternalServerError)
	// 	response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
	// 	json.NewEncoder(w).Encode(response)
	// 	return
	// }

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: transactions}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) GetTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	// var transaction models.Transaction
	data, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseTransaction(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) CreateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	request := new(transactionsdto.TransactionRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var TransIdIsMatch = false
	var TransactionId int
	for !TransIdIsMatch {
		TransactionId = userId + rand.Intn(10000) - rand.Intn(100)
		transactionData, _ := h.TransactionRepository.GetTransaction(TransactionId)
		if transactionData.ID == 0 {
			TransIdIsMatch = true
		}
	}

	transaction := models.Transaction{
		ID:     TransactionId,
		UserID: userId,
		Price:  120000,
		Status: "pending",
	}

	// validation := validator.New()
	// err := validation.Struct(request)
	// if err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
	// 	json.NewEncoder(w).Encode(response)
	// 	return
	// }

	// transaction := models.Transaction{
	// 	StartDate: request.StartDate,
	// 	DueDate:   request.DueDate,
	// 	UserID:    request.UserID,
	// 	Attache:   request.Attache,
	// 	Status:    request.Status,
	// }

	newTransaction, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	dataTransactions, err := h.TransactionRepository.GetTransaction(newTransaction.ID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}

	// 1. Initiate Snap client
	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)
	// Use to midtrans.Production if you want Production Environment (accept real transaction).

	// 2. Initiate Snap request param
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(dataTransactions.ID),
			GrossAmt: int64(dataTransactions.Price),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: dataTransactions.User.FullName,
			Email: dataTransactions.User.Email,
		},
	}

	// 3. Execute request create Snap transaction to Midtrans Snap API
	snapResp, _ := s.CreateTransaction(req)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: snapResp}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerTransaction) UpdateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(transactionsdto.TransactionUpdateRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	transactionData, _ := h.TransactionRepository.GetTransaction(id)

	transaction := models.Transaction{}
	transactionData, err := h.TransactionRepository.GetTransaction(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if request.StartDate != "" {
		transactionData.StartDate = request.StartDate
	} else {
		transaction.StartDate = transactionData.StartDate
	}

	if request.DueDate != "" {
		transactionData.DueDate = request.DueDate
	} else {
		transaction.StartDate = transactionData.DueDate
	}

	if request.UserID != 0 {
		transaction.UserID = request.UserID
		transactionDataNew, _ := h.TransactionRepository.GetTransaction(transaction.UserID)
		transaction.User = transactionDataNew.User
	} else {
		transaction.UserID = transactionData.UserID
		transaction.User = transactionData.User
	}

	if request.Attache != "" {
		transaction.Attache = request.Attache
	} else {
		transaction.Attache = transactionData.Attache
	}

	if request.Status != "" {
		transaction.Status = request.Status
	} else {
		transaction.Status = transactionData.Status
	}

	data, err := h.TransactionRepository.UpdatesTransaction(transaction)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseUpdateTransaction(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) DeleteTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.TransactionRepository.DeleteTransaction(transaction, id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseTransaction(data)}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerTransaction) Notification(w http.ResponseWriter, r *http.Request) {
	var notificationPayload map[string]interface{}

	err := json.NewDecoder(r.Body).Decode(&notificationPayload)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	transaction, _ := h.TransactionRepository.GetOneTransaction(orderId)

	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			// TODO set transaction status on your database to 'challenge'
			// e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
			h.TransactionRepository.UpdateTransaction("pending", orderId)
		} else if fraudStatus == "accept" {
			// TODO set transaction status on your database to 'success'
			SendMail("success", transaction)
			h.TransactionRepository.UpdateTransaction("success", orderId)
		}
	} else if transactionStatus == "settlement" {
		// TODO set transaction status on your databaase to 'success'
		SendMail("success", transaction)
		h.TransactionRepository.UpdateTransaction("success", orderId)
	} else if transactionStatus == "deny" {
		// TODO you can ignore 'deny', because most of the time it allows payment retries
		// and later can become success
		SendMail("failed", transaction)
		h.TransactionRepository.UpdateTransaction("failed", orderId)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		// TODO set transaction status on your databaase to 'failure'
		SendMail("failed", transaction)
		h.TransactionRepository.UpdateTransaction("failed", orderId)
	} else if transactionStatus == "pending" {
		// TODO set transaction status on your databaase to 'pending' / waiting payment
		h.TransactionRepository.UpdateTransaction("pending", orderId)
	}

	w.WriteHeader(http.StatusOK)
}

//	func convertResponseTransaction(t models.Transaction) transactionsdto.TransactionResponse {
//		return transactionsdto.TransactionResponse{
//			ID:        t.ID,
//			StartDate: t.StartDate,
//			DueDate:   t.DueDate,
//			UserID:    t.UserID,
//			Attache:   t.Attache,
//			Status:    t.Status,
//		}
//	}
func convertResponseTransaction(u models.Transaction) models.Transaction {
	return models.Transaction{
		ID:        u.ID,
		StartDate: u.StartDate,
		DueDate:   u.DueDate,
		User:      u.User,
		UserID:    u.UserID,
		Attache:   u.Attache,
		Status:    u.Status,
	}
}

func convertResponseUpdateTransaction(u models.Transaction) transactionsdto.TransactionUpdateResponse {
	return transactionsdto.TransactionUpdateResponse{
		ID:        u.ID,
		StartDate: u.StartDate,
		DueDate:   u.DueDate,
		UserID:    u.UserID,
		User:      u.User,
		Attache:   u.Attache,
		Status:    u.Status,
	}
}

// func convertResponseDeleteTransaction(u models.Transaction) transactionsdto.TransactionDeleteResponse {
// 	return transactionsdto.TransactionDeleteResponse{
// 		ID: u.ID,
// 	}
// }

func SendMail(status string, transaction models.Transaction) {

	if status != transaction.Status && (status == "success") {
		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		//   var CONFIG_USE_TLS = true
		var CONFIG_SENDER_NAME = "irham.f.rufdo@gmail.com"
		var CONFIG_AUTH_EMAIL = os.Getenv("SYSTEM_EMAIL")
		var CONFIG_AUTH_PASSWORD = os.Getenv("SYSTEM_PASSWORD")

		var userName = transaction.User.FullName
		var price = strconv.Itoa(transaction.Price)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", transaction.User.Email)
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
	  <html lang="en">
		<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
		  h1 {
		  color: brown;
		  }
		</style>
		</head>
		<body>
		<h2>Product payment :</h2>
		<ul style="list-style-type:none;">
		  <li>Name : %s</li>
		  <li>Total payment: Rp.%s</li>
		  <li>Status : <b>%s</b></li>
		</ul>
		</body>
	  </html>`, userName, price, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			// CONFIG_USE_TLS,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			log.Fatal(err.Error())
		}

		log.Println("Mail sent! to " + transaction.User.Email)
	}
}
