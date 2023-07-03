import { ObjectId } from "mongodb";
import { db } from "../connection";

export async function getPostBookmark(postId: string, userId: string) {
    return await db.collection("bookmarks").findOne({
        userId: new ObjectId(userId),
        postId: new ObjectId(postId)
    });
}

export async function createPostBookmark(postId: string, userId: string) {
    const { insertedId } = await db.collection("bookmarks").insertOne({
        userId: new ObjectId(userId),
        postId: new ObjectId(postId)
    });
    return insertedId;
}

export async function deletePostBookmark(postId: string, userId: string) {
    const { deletedCount } = await db.collection("bookmarks").deleteOne({
        userId: new ObjectId(userId),
        postId: new ObjectId(postId)
    });
    return deletedCount;
}

export async function deletePostBookmarks(postId: string) {
    const { deletedCount } = await db.collection("bookmarks").deleteMany({
        postId: new ObjectId(postId)
    });
    return deletedCount;
}

export async function deleteBookmarksByUserId(userId: string) {
    const { deletedCount } = await db.collection("bookmarks").deleteOne({
        userId: new ObjectId(userId)
    });
    return deletedCount;
}
