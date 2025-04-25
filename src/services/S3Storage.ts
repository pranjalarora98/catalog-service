import {
    PutObjectCommand,
    PutObjectCommandOutput,
    S3Client,
} from "@aws-sdk/client-s3";

interface s3Storage {
    upload: (buffer: Buffer, name: string) => Promise<string>;
}

export class S3Storage implements s3Storage {
    private client;

    constructor() {
        this.client = new S3Client({
            region: "eu-north-1",
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID!,
                secretAccessKey: process.env.SECRET_ACCESS_KEY!,
            },
        });
    }

    async upload(buffer: Buffer, name: string) {
        const params = {
            Bucket: "mernspace-project-pranjal",
            Body: buffer,
            Key: name,
        };

        const res = await this.client.send(new PutObjectCommand(params));
        return `https://mernspace-project-pranjal.s3.eu-north-1.amazonaws.com/${name}`;
    }
}
