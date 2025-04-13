package main

import (
	"fmt"
	"net/http"

	"the-golang-clicker/api/handlers"
	"the-golang-clicker/api/repositories"
	"the-golang-clicker/api/routes"
	"the-golang-clicker/api/services"

	"the-golang-clicker/database"

	"github.com/gorilla/mux"
)

func main() {
	err := database.Connect()
	if err != nil {
		panic(err)
	}

	playerRepo := repositories.NewPlayerPostgresRepository(database.DB)
	playerService := services.NewPlayerService(playerRepo)

	handlers.SetPlayerService(playerService)

	router := mux.NewRouter()

	routes.RegisterPlayerRoutes(router)

	fmt.Println("Server is running on localhost:8080")

	http.ListenAndServe(":8080", router)
}
