package services

import (
	"the-golang-clicker/api/repositories"
	"the-golang-clicker/models"
)

type GameManagerService struct {
	repository repositories.GameManagerRepository
}

func NewGameManagerService(repo repositories.GameManagerRepository) *GameManagerService {
	return &GameManagerService{
		repository: repo,
	}
}

func (s *GameManagerService) GetUpgradeList() ([]*models.UpgradeModel, error) {
	upgradeList, err := s.repository.GetUpgradeList()
	if err != nil {
		return nil, err
	}

	return upgradeList, nil
}
