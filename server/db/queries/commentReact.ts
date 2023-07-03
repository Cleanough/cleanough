import { ObjectId } from "mongodb";
import { db } from "../connection";

export async function createCommentReact(
    commentId: string,
    userId: string,
    reaction: string
) {
    const { insertedId } = await db.collection("commentReacts").insertOne({
        userId: new ObjectId(userId),
        commentId: new ObjectId(commentId),
        reaction,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return insertedId;
}

export async function updateCommentReact(
    commentId: string,
    userId: string,
    reaction: string
) {
    return db
        .collection("commentReacts")
        .findOneAndUpdate(
            {
                userId: new ObjectId(userId),
                commentId: new ObjectId(commentId)
            },
            { $set: { reaction, updatedAt: new Date() } },
            { upsert: true, returnOriginal: false }
        );
}

export async function getCommentReact(commentId: string, userId: string) {
    return await db.collection("commentReacts").findOne({
        userId: new ObjectId(userId),
        commentId: new ObjectId(commentId)
    });
}

export async function deleteCommentReact(commentId: string, userId: string) {
    const { deletedCount } = await db.collection("commentReacts").deleteOne({
        userId: new ObjectId(userId),
        commentId: new ObjectId(commentId)
    });
    return deletedCount;
}

export async function deleteCommentReactsByUserId(userId: string) {
    const { deletedCount } = await db.collection("commentReacts").deleteMany({
        userId: new ObjectId(userId)
    });
    return deletedCount;
}

export async function deleteCommentReacts(commentId: string) {
    const { deletedCount } = await db.collection("commentReacts").deleteMany({
        commentId: new ObjectId(commentId)
    });
    return deletedCount;
}

export async function deleteCommentsReacts(commentsId: string) {
    const { deletedCount } = await db.collection("commentReacts").deleteMany({
        commentId: {
            $in: commentsId
        }
    });
    return deletedCount;
}
