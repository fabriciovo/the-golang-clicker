package repositories

import (
	"database/sql"
	"the-golang-clicker/models"
)

type PlayerPostgresRepository struct {
	db *sql.DB
}

func NewPlayerPostgresRepository(db *sql.DB) *PlayerPostgresRepository {
	return &PlayerPostgresRepository{
		db: db,
	}
}

func (r *PlayerPostgresRepository) Save(player *models.PlayerModel) error {
	query := "INSERT INTO players (id, coins, click_force, cps, level) VALUES ($1, $2, $3, $4, $5)"
	_, err := r.db.Exec(query, player.ID, player.Coins, player.ClickForce, player.Cps, player.Level)
	return err
}

func (r *PlayerPostgresRepository) GetByID(id string) (*models.PlayerModel, error) {
	query := "SELECT id, coins, click_force, cps, level FROM players WHERE id=$1"
	row := r.db.QueryRow(query, id)

	var player models.PlayerModel
	err := row.Scan(&player.ID, &player.Coins, &player.ClickForce, &player.Cps, &player.Level)
	if err != nil {
		return nil, err
	}

	return &player, nil
}
