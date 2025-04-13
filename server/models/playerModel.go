package model

type PlayerModel struct {
	ID         string         `json:"id"`
	ClickForce int            `json:"clickForce"`
	Coins      int            `json:"coins"`
	Cps        int            `json:"cps"`
	Level      int            `json:"level"`
	Upgrades   map[string]int `json:"upgrades"`
}
