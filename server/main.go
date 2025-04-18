package main

import (
	"fmt"
	"net/http"
	"os"

	handlersLocal "the-golang-clicker/api/handlers"
	"the-golang-clicker/api/repositories"
	"the-golang-clicker/api/routes"
	"the-golang-clicker/api/services"

	"the-golang-clicker/database"

	"github.com/gorilla/handlers"
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

	handlersLocal.SetPlayerService(playerService)

	router := mux.NewRouter().StrictSlash(true)

	routes.RegisterPlayerRoutes(router)

	frontendURL := os.Getenv("FRONTEND_URL")

	corsAllowed := handlers.CORS(
		handlers.AllowedOrigins([]string{frontendURL}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type"}),
	)

	fmt.Println("Server is running on localhost:8080")

	fmt.Println("🔗 All routes start here")
	router.Walk(func(route *mux.Route, router *mux.Router, ancestors []*mux.Route) error {
		tpl, _ := route.GetPathTemplate()
		methods, _ := route.GetMethods()
		fmt.Println("🔗 All routes:", methods, tpl)
		return nil
	})
	fmt.Println("🔗 All routes end here")

	http.ListenAndServe(":8080", corsAllowed(router))
}
