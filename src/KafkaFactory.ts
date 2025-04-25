import KafkaBroker from "./KafkaBroker";
import { kafkaType } from "./types";

let kafkaFactoryInstance: kafkaType | null = null;

export default function KafkaFactory() {
    if (!kafkaFactoryInstance) {
        kafkaFactoryInstance = new KafkaBroker("catalog-service", [
            "localhost:9092",
        ]);
    }
    return kafkaFactoryInstance;
}
