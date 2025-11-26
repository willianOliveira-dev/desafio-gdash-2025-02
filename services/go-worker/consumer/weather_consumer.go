package consumer

import (
	"bytes"
	"log"
	"net/http"

	amqp "github.com/rabbitmq/amqp091-go"
	config "github.com/willianOliveira-dev/desafio-gdash-2025/go-worker/config"
)

func sendToApi(apiUrl string, messages <-chan amqp.Delivery) {
	go func() {
		for msg := range messages {
			log.Printf("Mensagem recebida: %v", string(msg.Body))

			res, error := http.Post(
				apiUrl,
				"application/json",
				bytes.NewBuffer(msg.Body),
			)

			if error != nil {
				log.Println("Error ao enviar mensagem para API NestJS", error)
				continue
			}

			res.Body.Close()

			log.Println("Enviando para API NestJS. Status: ", res.Status)

		}
	}()
}

func WeatherConsumer(channel *amqp.Channel) {
	env := config.Settings()
	queueName := env.RABBITMQ_QUEUE
	exchange := env.RABBITMQ_EXCHANGE
	routingKey := env.RABBITMQ_ROUTING_KEY
	apiNestUrl := env.API_NEST_URL

	queue, error := channel.QueueDeclare(
		queueName,
		true,
		false,
		false,
		false,
		nil,
	)

	if error != nil {
		log.Fatalf("Error ao declarar fila: %v", error)
	}

	errorBindQueueToExchange := channel.QueueBind(
		queue.Name,
		routingKey,
		exchange,
		false,
		nil,
	)

	if errorBindQueueToExchange != nil {
		log.Fatalf("Error ao vincular fila a exchange: %v", errorBindQueueToExchange)
	}

	messages, error := channel.Consume(
		queue.Name,
		"",
		true,
		false,
		false,
		false,
		nil,
	)

	if error != nil {
		log.Fatalf("Error ao consumir mensagens: %v", error)
	}

	log.Println("Worker Go escutando fila: ", queue.Name)

	sendToApi(apiNestUrl, messages)

}
