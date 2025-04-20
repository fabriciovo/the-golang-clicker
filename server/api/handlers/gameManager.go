package handlers

import (
	"encoding/json"
	"net/http"
	"the-golang-clicker/api/services"
)

var gameManagerService *services.GameManagerService

func SetGameManagerService(s *services.GameManagerService) {
	gameManagerService = s
}

func GetUpgradeList(w http.ResponseWriter, r *http.Request) {
	upgradeList, err := gameManagerService.GetUpgradeList()
	if err != nil {
		http.Error(w, "failed to return upgrades", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(upgradeList)

}
