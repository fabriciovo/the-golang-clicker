package database

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func Connect() error {
	_ = godotenv.Load()

	var err error
	databaseURL := os.Getenv("DATABASE_URL")
	DB, err = sql.Open("postgres", databaseURL)
	if err != nil {
		return err
	}

	err = DB.Ping()
	if err != nil {
		return err
	}

	fmt.Println("✅ Banco de dados conectado com sucesso!")
	return nil
}
