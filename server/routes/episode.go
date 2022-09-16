package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/gorilla/mux"
)

func EpisodeRoutes(r *mux.Router) {
	episodeRepository := repositories.RepositoryEpisode(mysql.DB)
	h := handlers.HandlerEpisode(episodeRepository)

	r.HandleFunc("/episodes", h.FindEpisode).Methods("GET")
	r.HandleFunc("/episode/{id}", h.GetEpisode).Methods("GET")
	r.HandleFunc("/episode", h.CreateEpisode).Methods("POST")
	r.HandleFunc("/episode/{id}", h.UpdateEpisode).Methods("PATCH")
	r.HandleFunc("/episode/{id}", h.DeleteEpisode).Methods("DELETE")
}
