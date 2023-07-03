import { ObjectId } from "mongodb";
import { db } from "../connection";

export async function getComments(postId: string) {
    return await db
        .collection("comments")
        .find({
            postId: new ObjectId(postId)
        })
        .toArray();
}

export async function getCommentsByPostId(postId: string, page = 0) {
    return await db
        .collection("comments")
        .aggregate([
            {
                $match: {
                    postId: new ObjectId(postId)
                }
            },
            {
                $sort: {
                    createdAt: 1
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $lookup: {
                    from: "commentReacts",
                    localField: "_id",
                    foreignField: "commentId",
                    as: "commentReacts"
                }
            },
            {
                $addFields: {
                    upvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$commentReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "upvote"] }
                            }
                        }
                    },
                    downvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$commentReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "downvote"] }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    "user.password": 0,
                    "user.role": 0,
                    "user.emailVerified": 0
                }
            }
        ])
        .skip(page)
        .limit(1)
        .toArray();
}

export async function createCommentByUserId(
    userId: string,
    postId: string,
    comment: object
) {
    const { insertedId } = await db.collection("comments").insertOne({
        ...comment,
        postId: new ObjectId(postId),
        userId: new ObjectId(userId),
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return insertedId;
}

export async function deleteCommentsByPostId(postId: string) {
    const { deletedCount } = await db
        .collection("comments")
        .deleteMany({ postId: new ObjectId(postId) });
    return deletedCount;
}

export async function deleteCommentByUserId(commentId: string, userId: string) {
    const { deletedCount } = await db.collection("comments").deleteOne({
        _id: new ObjectId(commentId),
        userId: new ObjectId(userId)
    });
    return deletedCount;
}

export async function deleteCommentsByUserId(userId: string) {
    const { deletedCount } = await db.collection("comments").deleteOne({
        userId: new ObjectId(userId)
    });
    return deletedCount;
}
