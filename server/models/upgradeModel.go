package models

type UpgradeModel struct {
	ID          string `json:"id"`
	TextureName string `json:"textureName"`
	Name        string `json:"name"`
	Cost        int    `json:"cost"`
	Cps         int    `json:"cps"`
}
