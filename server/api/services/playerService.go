package services

import (
	repositories "the-golang-clicker/api/repositories"
	model "the-golang-clicker/models"

	"github.com/google/uuid"
)

type PlayerService struct {
	repository repositories.PlayerRepository
}

func NewPlayerService(repo repositories.PlayerRepository) *PlayerService {
	return &PlayerService{
		repository: repo,
	}
}

func (s *PlayerService) CreatePlayer() (*model.PlayerModel, error) {
	player := &model.PlayerModel{
		ID:         uuid.New().String(),
		ClickForce: 1,
		Coins:      0,
		Cps:        0,
		Level:      1,
		Upgrades:   make(map[string]int),
	}

	err := s.repository.Save(player)
	if err != nil {
		return nil, err
	}

	return player, nil
}

func (s *PlayerService) GetPlayer(id string) (*model.PlayerModel, error) {
	player, err := s.repository.GetByID(id)
	if err != nil {
		return nil, err
	}
	if player == nil {
		return nil, nil
	}
	return player, nil
}

func (s *PlayerService) SavePlayer(playerData *model.PlayerModel) error {
	err := s.repository.Save(playerData)
	if err != nil {
		return err
	}
	return nil
}
