package repositories

import model "the-golang-clicker/models"

type PlayerRepository interface {
	Save(player *model.PlayerModel) error
	GetByID(id string) (*model.PlayerModel, error)
}
