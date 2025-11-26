package mq

import (
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
	config "github.com/willianOliveira-dev/desafio-gdash-2025/go-worker/config"
)

func ConnectRabbitMQ() (*amqp.Connection, *amqp.Channel) {
	env := config.Settings()
	url := env.RABBITMQ_URL

	connection, error := amqp.Dial(url)

	if error != nil {
		log.Fatalf("Error ao conectar ao RabbitMQ: %v", error)
	}

	channel, error := connection.Channel()

	if error != nil {
		log.Fatalf("Error ao abrir canal: %v", error)
	}

	return connection, channel

}
