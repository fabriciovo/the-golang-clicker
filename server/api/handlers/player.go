package handlers

import (
	"encoding/json"
	"net/http"
	"the-golang-clicker/api/services"
)

var playerService *services.PlayerService

func SetPlayerService(s *services.PlayerService) {
	playerService = s
}

func InitPlayer(w http.ResponseWriter, r *http.Request) {
	player, err := playerService.CreatePlayer()
	if err != nil {
		http.Error(w, "failed to create player", http.StatusInternalServerError)
		return
	}

	println("asdokasfpkf")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"id": player.ID,
	})
}
