package main

import (
	"github.com/azunymous/arc/tournament"
	"io"
	"log"
	"os"
)

func main() {
	args := os.Args
	if len(args) < 2 {
		log.Fatalln("Provide the config path as an argument!")
	}

	filename := "./output.html"
	if len(args) > 2 {
		filename = args[2]
	}

	path := args[1]
	f, err := os.Create(filename)
	if err != nil {
		log.Fatalf("Could not create file: %v", f)
	}
	Load(path, f)
}

func Load(path string, writer io.Writer) {
	log.Printf("Loading config from %v", path)

	f, err := os.Open(path)
	if err != nil {
		log.Fatalf("Could not parse config file at path %s: %v", path, err)
	}
	defer f.Close()

	bytes, err := io.ReadAll(f)
	if err != nil {
		log.Fatalf("Could not read file at path %s: %v", path, err)
	}

	tournaments, err := tournament.From(bytes)
	if err != nil {
		log.Fatalf("Could not parse path %s: %v", path, err)
	}

	log.Printf("Ingested tournament data")

	err = tournament.NewTemplater(tournaments).Generate(writer)
	if err != nil {
		log.Fatalf("Could not parse path %s: %v", path, err)
	}
}

