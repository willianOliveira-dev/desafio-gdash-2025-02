package config

import "os"

type Env struct {
	RABBITMQ_URL string
	RABBITMQ_QUEUE string
	RABBITMQ_EXCHANGE string
	RABBITMQ_ROUTING_KEY string
	API_NEST_URL string
}

func Settings () Env {
	cfg := Env {
		RABBITMQ_URL: os.Getenv("RABBITMQ_URL"),
		RABBITMQ_QUEUE: os.Getenv("RABBITMQ_QUEUE"),
		RABBITMQ_EXCHANGE: os.Getenv("RABBITMQ_EXCHANGE"),
		RABBITMQ_ROUTING_KEY: os.Getenv("RABBITMQ_ROUTING_KEY"),
		API_NEST_URL: os.Getenv("API_NEST_URL"), 
	}
	return cfg
}
