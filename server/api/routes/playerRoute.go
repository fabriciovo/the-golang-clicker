package routes

import (
	handlers "the-golang-clicker/api/handlers"

	"github.com/gorilla/mux"
)

func RegisterPlayerRoutes(router *mux.Router) {
	router.HandleFunc("/player/init", handlers.InitPlayer).Methods("POST")
}
