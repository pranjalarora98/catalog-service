export interface PriceConfiguration {
    [key: string]: {
        priceType: string;
        availableOptions: Record<string, number>;
    };
}

export interface Message {
    id: string;
    priceConfiguration: PriceConfiguration;
}

export interface kafkaType {
    connect: () => Promise<void>;
    sendMessage: (topic: string, messages: Message[]) => void;
    disconnect: () => Promise<void>;
}
