import { ObjectId } from "mongodb";
import { db } from "../connection";

export async function createPostReact(
    postId: string,
    userId: string,
    reaction: string
) {
    const { insertedId } = await db.collection("postReacts").insertOne({
        userId: new ObjectId(userId),
        postId: new ObjectId(postId),
        reaction,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    return insertedId;
}

export async function updatePostReact(
    postId: string,
    userId: string,
    reaction: string
) {
    return db
        .collection("postReacts")
        .findOneAndUpdate(
            { userId: new ObjectId(userId), postId: new ObjectId(postId) },
            { $set: { reaction, updatedAt: new Date() } },
            { upsert: true, returnOriginal: false }
        );
}

export async function getPostReact(postId: string, userId: string) {
    return await db.collection("postReacts").findOne({
        userId: new ObjectId(userId),
        postId: new ObjectId(postId)
    });
}

export async function deletePostReact(postId: string, userId: string) {
    const { deletedCount } = await db.collection("postReacts").deleteOne({
        userId: new ObjectId(userId),
        postId: new ObjectId(postId)
    });
    return deletedCount;
}

export async function deletePostReactsByUserId(userId: string) {
    const { deletedCount } = await db.collection("postReacts").deleteOne({
        userId: new ObjectId(userId)
    });
    return deletedCount;
}

export async function deletePostReacts(postId: string) {
    const { deletedCount } = await db.collection("postReacts").deleteOne({
        postId: new ObjectId(postId)
    });
    return deletedCount;
}
