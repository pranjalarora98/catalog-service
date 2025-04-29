import { Kafka, Message, Producer } from "kafkajs";
import { kafkaType } from "./types";

class KafkaBroker implements kafkaType {
    private kafka: Kafka;
    private producer: Producer;
    constructor(clientId: string, brokers: string[]) {
        this.kafka = new Kafka({ clientId, brokers });
        this.producer = this.kafka.producer();
    }

    async connect() {
        await this.producer.connect();
    }

    async sendMessage(topic: string, messages: Message[]) {
        await this.producer.send({
            topic,
            messages: messages.map((item) => ({ value: JSON.stringify(item) })),
        });
    }

    async disconnect() {
        await this.producer.disconnect();
    }
}

export default KafkaBroker;
