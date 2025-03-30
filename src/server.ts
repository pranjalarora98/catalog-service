import app from "./app";
import logger from "./config/logger";
import { initDb } from "./db";

const startServer = async () => {
    const PORT = 5502;
    try {
        app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
        await initDb();
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message);
            logger.on("finish", () => {
                process.exit(1);
            });
        }
    }
};

void startServer();
