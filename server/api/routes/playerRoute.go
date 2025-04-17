package routes

import (
	"net/http"
	handlers "the-golang-clicker/api/handlers"

	"github.com/gorilla/mux"
)

func RegisterPlayerRoutes(router *mux.Router) {
	router.HandleFunc("/player/init", handlers.InitPlayer).Methods("POST")
	router.HandleFunc("/player/save", handlers.SavePlayer).Methods("PUT")

	router.HandleFunc("/player/{id}", handlers.GetPlayer).Methods("GET")
	router.HandleFunc("/player/teste", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("rota teste funcionando"))
	}).Methods("GET")

}
