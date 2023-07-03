import { ObjectId } from "mongodb";
import { db } from "../connection";

export async function getFeed(userId: string, page = 1) {
    const limit = 3;
    const followings = await db
        .collection("followings")
        .find({ userId: new ObjectId(userId) })
        .toArray();
    const topics = followings.map((following: any) => following.topic);

    return await db
        .collection("posts")
        .aggregate([
            {
                $match: {
                    $or: [
                        { userId: new ObjectId(userId) },
                        { "tabs.language": { $in: topics } }
                    ]
                }
            },
            {
                $sort: {
                    createdAt: -1
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
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "postReacts",
                    localField: "_id",
                    foreignField: "postId",
                    as: "postReacts"
                }
            },
            {
                $addFields: {
                    commentCounts: { $size: "$comments" },
                    upvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "upvote"] }
                            }
                        }
                    },
                    downvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "downvote"] }
                            }
                        }
                    }
                }
            },
            {
                $limit: page * limit
            },
            {
                $project: {
                    "user.password": 0,
                    "user.role": 0,
                    "user.emailVerified": 0,
                    comments: 0
                }
            }
        ])
        .toArray();
}

export async function getPosts(userId: string, page = 1) {
    const limit = 3;
    return await db
        .collection("posts")
        .aggregate([
            {
                $match: {
                    $or: [{ userId: new ObjectId(userId) }]
                }
            },
            {
                $sort: {
                    createdAt: -1
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
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "postReacts",
                    localField: "_id",
                    foreignField: "postId",
                    as: "postReacts"
                }
            },
            {
                $addFields: {
                    commentCounts: { $size: "$comments" },
                    upvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "upvote"] }
                            }
                        }
                    },
                    downvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "downvote"] }
                            }
                        }
                    }
                }
            },
            {
                $limit: page * limit
            },
            {
                $project: {
                    "user.password": 0,
                    "user.role": 0,
                    "user.emailVerified": 0,
                    comments: 0
                }
            }
        ])
        .toArray();
}

export async function getRecentPosts(page = 1) {
    const limit = 3;
    return await db
        .collection("posts")
        .aggregate([
            {
                $sort: {
                    createdAt: -1
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
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "postReacts",
                    localField: "_id",
                    foreignField: "postId",
                    as: "postReacts"
                }
            },
            {
                $addFields: {
                    commentCounts: { $size: "$comments" },
                    upvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "upvote"] }
                            }
                        }
                    },
                    downvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "downvote"] }
                            }
                        }
                    }
                }
            },
            {
                $limit: page * limit
            },
            {
                $project: {
                    "user.password": 0,
                    "user.role": 0,
                    "user.emailVerified": 0,
                    comments: 0
                }
            }
        ])
        .toArray();
}

export async function getPost(postId: string) {
    return await db
        .collection("posts")
        .aggregate([
            {
                $match: {
                    _id: new ObjectId(postId)
                }
            },
            {
                $sort: {
                    createdAt: -1
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
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "postReacts",
                    localField: "_id",
                    foreignField: "postId",
                    as: "postReacts"
                }
            },
            {
                $addFields: {
                    commentCounts: { $size: "$comments" },
                    upvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "upvote"] }
                            }
                        }
                    },
                    downvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
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
                    "user.emailVerified": 0,
                    comments: 0
                }
            }
        ])
        .toArray();
}

export async function getPostsByUsername(username: string, page = 1) {
    const limit = 3;
    return await db
        .collection("posts")
        .aggregate([
            {
                $sort: {
                    createdAt: -1
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
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "postReacts",
                    localField: "_id",
                    foreignField: "postId",
                    as: "postReacts"
                }
            },
            {
                $match: {
                    "user.username": username
                }
            },
            {
                $addFields: {
                    commentCounts: { $size: "$comments" },
                    upvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "upvote"] }
                            }
                        }
                    },
                    downvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "downvote"] }
                            }
                        }
                    }
                }
            },
            {
                $limit: limit * page
            },
            {
                $project: {
                    "user.password": 0,
                    "user.role": 0,
                    "user.emailVerified": 0,
                    comments: 0
                }
            }
        ])
        .toArray();
}

export async function getBookmarkPostsByUser(userId: string, page = 1) {
    const limit = 3;
    return await db
        .collection("posts")
        .aggregate([
            {
                $sort: {
                    createdAt: -1
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
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "postReacts",
                    localField: "_id",
                    foreignField: "postId",
                    as: "postReacts"
                }
            },
            {
                $lookup: {
                    from: "bookmarks",
                    localField: "_id",
                    foreignField: "postId",
                    as: "bookmark"
                }
            },
            {
                $match: {
                    "bookmark.userId": new ObjectId(userId)
                }
            },
            {
                $addFields: {
                    commentCounts: { $size: "$comments" },
                    upvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "upvote"] }
                            }
                        }
                    },
                    downvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "downvote"] }
                            }
                        }
                    }
                }
            },
            {
                $limit: page * limit
            },
            {
                $project: {
                    "user.password": 0,
                    "user.role": 0,
                    "user.emailVerified": 0,
                    comments: 0
                }
            }
        ])
        .toArray();
}

export async function getCommentPostsByUser(userId: string, page = 1) {
    const limit = 3;
    return await db
        .collection("posts")
        .aggregate([
            {
                $sort: {
                    createdAt: -1
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
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "postReacts",
                    localField: "_id",
                    foreignField: "postId",
                    as: "postReacts"
                }
            },
            {
                $match: {
                    comments: {
                        $elemMatch: {
                            userId: new ObjectId(userId)
                        }
                    }
                }
            },
            {
                $addFields: {
                    commentCounts: { $size: "$comments" },
                    upvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "upvote"] }
                            }
                        }
                    },
                    downvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "downvote"] }
                            }
                        }
                    }
                }
            },
            {
                $limit: limit * page
            },
            {
                $project: {
                    "user.password": 0,
                    "user.role": 0,
                    "user.emailVerified": 0
                    // "comments": 0
                }
            }
        ])
        .toArray();
}

export async function getCommentPostsByUsername(username: string, page = 1) {
    const limit = 3;
    const user = await db.collection("users").findOne({ username });
    return await db
        .collection("posts")
        .aggregate([
            {
                $sort: {
                    createdAt: -1
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
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "postReacts",
                    localField: "_id",
                    foreignField: "postId",
                    as: "postReacts"
                }
            },
            {
                $match: {
                    comments: {
                        $elemMatch: {
                            userId: new ObjectId(user._id)
                        }
                    }
                }
            },
            {
                $addFields: {
                    commentCounts: { $size: "$comments" },
                    upvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "upvote"] }
                            }
                        }
                    },
                    downvoteCounts: {
                        $size: {
                            $filter: {
                                input: "$postReacts",
                                as: "react",
                                cond: { $eq: ["$$react.reaction", "downvote"] }
                            }
                        }
                    }
                }
            },
            {
                $limit: limit * page
            },
            {
                $project: {
                    "user.password": 0,
                    "user.role": 0,
                    "user.emailVerified": 0
                    // "comments": 0
                }
            }
        ])
        .toArray();
}

export async function deletePostByUserId(id: string, userId: string) {
    const { deletedCount } = await db.collection("posts").deleteOne({
        _id: new ObjectId(id),
        userId: new ObjectId(userId)
    });
    return deletedCount;
}

export async function deletePostsByUserId(userId: string) {
    const { deletedCount } = await db.collection("posts").deleteMany({
        userId: new ObjectId(userId)
    });
    return deletedCount;
}

export async function createPost(userId: string, post: object) {
    const { insertedId } = await db.collection("posts").insertOne({
        ...post,
        userId: new ObjectId(userId),
        createdAt: new Date(),
        updatedAt: new Date()
    });
    return insertedId;
}
