package main

import (
	"github.com/azunymous/arc/config"
	"github.com/azunymous/arc/server"
	"github.com/azunymous/arc/tournament"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"log"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	configuredTournaments := config.Tournaments()
	tournaments, err := tournament.From(configuredTournaments)
	if err != nil {
		log.Fatalf("Could not parse tournaments: %v", err)
	}
	t := tournament.NewTournamentsFromConfig(tournaments)
	srv := server.NewSrv(t)

	app := fiber.New()
	app.Use(cors.New(), limiter.New(), logger.New(), requestid.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})
	app.Get("/events", srv.Events)

	err = app.Listen(":" + port)
	if err != nil {
		log.Println(err)
	}
}
