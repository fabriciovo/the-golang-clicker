package routes

import (
	"net/http"
	handlers "the-golang-clicker/api/handlers"

	"github.com/gorilla/mux"
)

func RegisterGameManagerRoutes(router *mux.Router) {
	router.HandleFunc("/gm/upgradeList", handlers.GetUpgradeList).Methods("GET")
	router.HandleFunc("/gm/teste", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("rota teste funcionando"))
	}).Methods("GET")

}
