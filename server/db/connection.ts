import { MongoClient } from "mongodb";
import { addSuperAdmin, getUserByEmail } from "./queries/user";

global.mongo = global.mongo || {};

export let db: any;

let superAdminCreated = false;
let indexesCreated = false;

export async function getMongoClient() {
    if (!global.mongo.client) {
        global.mongo.client = new MongoClient(process.env.MONGODB_URI!);
    }

    await global.mongo.client.connect();

    return global.mongo.client;
}

async function createSuperAdmin() {
    const user = await getUserByEmail(process.env.SEED_ADMIN_EMAIL!);
    if (!user) {
        await addSuperAdmin();
    }
    superAdminCreated = true;
}

async function createIndexes() {
    await Promise.all([
        db
            .collection("followings")
            .createIndex({ userId: 1, topic: 1 }, { unique: true }),
        db
            .collection("users")
            .createIndex({
                username: "text",
                firstName: "text",
                lastName: "text"
            })
    ]);

    indexesCreated = true;
}

export async function connectDB() {
    try {
        const dbClient = await getMongoClient();
        if (!db) db = dbClient.db(process.env.MONGODB_DB);
        if (!superAdminCreated) await createSuperAdmin();
        if (!indexesCreated) await createIndexes();
        return null;
    } catch (e) {
        return e;
    }
}
