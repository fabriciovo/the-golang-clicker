package handlers

import (
	"encoding/json"
	"net/http"
	"the-golang-clicker/api/services"
	"the-golang-clicker/models"

	"github.com/gorilla/mux"
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

	println("Player ID: ", player.ID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(player)
}

func GetPlayer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	playerID := vars["id"]

	if playerID == "" {
		http.Error(w, "Player ID is required", http.StatusBadRequest)
		return
	}

	player, err := playerService.GetPlayer(playerID)
	if err != nil {
		http.Error(w, "Failed to get player: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(player); err != nil {
		http.Error(w, "Failed to encode player data", http.StatusInternalServerError)
	}
}

func SavePlayer(w http.ResponseWriter, r *http.Request) {
	playerData := &models.PlayerModel{}
	if err := json.NewDecoder(r.Body).Decode(playerData); err != nil {
		http.Error(w, "Failed to decode player data: "+err.Error(), http.StatusBadRequest)
		return
	}

	if err := playerService.SavePlayer(playerData); err != nil {
		http.Error(w, "Failed to save player: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
