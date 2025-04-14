package main

import (
	"fmt"
	"net/http"
	"os"

	"the-golang-clicker/api/handlers"
	"the-golang-clicker/api/repositories"
	"the-golang-clicker/api/routes"
	"the-golang-clicker/api/services"

	"the-golang-clicker/database"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	err := database.Connect()
	if err != nil {
		panic(err)
	}

	playerRepo := repositories.NewPlayerPostgresRepository(database.DB)
	playerService := services.NewPlayerService(playerRepo)

	handlers.SetPlayerService(playerService)

	router := mux.NewRouter()

	routes.RegisterPlayerRoutes(router)

	frontendURL := os.Getenv("FRONTEND_URL")

	corsAllowed := handlers.CORS(
		handlers.AllowedOrigins([]string{frontendURL}),
		handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type"}),
	)

	fmt.Println("Server is running on localhost:8080")

	http.ListenAndServe(":8080", router)
}
