import { db } from "../connection";

export async function createTopics(topics: Array<string>) {
    const currentTopics = topics.map((topic) => {
        return { name: topic };
    });

    try {
        const { insertedIds } = await db
            .collection("topics")
            .insertMany(currentTopics, { ordered: false });
        return insertedIds;
    } catch (error) {}
}

export async function getTopics() {
    return await db.collection("topics").find({}).toArray();
}
