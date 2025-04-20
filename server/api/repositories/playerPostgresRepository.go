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

func (r *PlayerPostgresRepository) Save(p *models.PlayerModel) error {
	const q = `
    INSERT INTO players (id, coins, click_force, cps, level)
    VALUES ($1,$2,$3,$4,$5)
    ON CONFLICT (id) DO UPDATE
      SET coins       = EXCLUDED.coins,
          click_force = EXCLUDED.click_force,
          cps         = EXCLUDED.cps,
          level       = EXCLUDED.level;
    `
	_, err := r.db.Exec(q,
		p.ID, p.Coins, p.ClickForce, p.Cps, p.Level,
	)
	return err
}

func (r *PlayerPostgresRepository) GetByID(id string) (*models.PlayerModel, error) {
	query := "SELECT id, coins, click_force, cps, level FROM players WHERE id=$1"
	row := r.db.QueryRow(query, id)
	println(&row)
	var player models.PlayerModel
	err := row.Scan(&player.ID, &player.Coins, &player.ClickForce, &player.Cps, &player.Level)
	if err != nil {
		return nil, err
	}

	return &player, nil
}
