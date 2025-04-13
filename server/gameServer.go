package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.GET("/player", getPlayer)

	fmt.Println("Server is running on localhost:8080")
	r.Run("localhost:8080")
}

func getPlayer(c *gin.Context) {
	//c.IndentedJSON(http.StatusOK, player1)
}
