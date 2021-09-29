package server

import (
	"github.com/azunymous/arc/tournament"
	"github.com/gofiber/fiber/v2"
)

type Srv struct {
	t *tournament.Tournaments
}

func NewSrv(t *tournament.Tournaments) *Srv {
	return &Srv{t: t}
}

func (s *Srv) Events(ctx *fiber.Ctx) error {
	return ctx.JSON(&s.t)
}
