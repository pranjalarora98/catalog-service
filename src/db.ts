import mongoose from "mongoose";

export const initDb = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await mongoose.connect(
        "mongodb://root:root@localhost:27017/catalog?authSource=admin",
    );
};
