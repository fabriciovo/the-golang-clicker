package repositories

import (
	"database/sql"
	"the-golang-clicker/models"
)

type GameManagerPostgresRepository struct {
	db *sql.DB
}

func NewGameManagerPostgresRepository(db *sql.DB) *GameManagerPostgresRepository {
	return &GameManagerPostgresRepository{
		db: db,
	}
}

func (r *GameManagerPostgresRepository) GetUpgradeList() ([]*models.UpgradeModel, error) {
	query := "SELECT id, cost, cps, name, textureName FROM upgrades"
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var upgradeList []*models.UpgradeModel

	for rows.Next() {
		upgrade := new(models.UpgradeModel)
		err := rows.Scan(&upgrade.ID, &upgrade.Cost, &upgrade.Cps, &upgrade.Name, &upgrade.TextureName)
		if err != nil {
			return nil, err
		}
		upgradeList = append(upgradeList, upgrade)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return upgradeList, nil
}
