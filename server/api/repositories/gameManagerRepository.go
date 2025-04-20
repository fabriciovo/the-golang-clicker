package repositories

import models "the-golang-clicker/models"

type GameManagerRepository interface {
	GetUpgradeList() ([]*models.UpgradeModel, error)
}
