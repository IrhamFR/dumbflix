package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	// TodoRoutes(r)
	UserRoutes(r)
	FilmRoutes(r)
	CategoryRoutes(r)
	TransactionRoutes(r)
	EpisodeRoutes(r)
	AuthRoutes(r)
}
