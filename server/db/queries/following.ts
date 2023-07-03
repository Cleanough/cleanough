import { ObjectId } from "mongodb";
import { db } from "../connection";

export async function getFollowingsByUserId(userId: string) {
    return await db
        .collection("followings")
        .find({ userId: new ObjectId(userId) })
        .toArray();
}

export async function createFollowing(userId: string, topic: string) {
    try {
        const { insertedId } = await db.collection("followings").insertOne(
            {
                userId: new ObjectId(userId),
                topic
            },
            { unique: true }
        );
        return insertedId;
    } catch (error) {
        return null;
    }
}
export async function deleteFollowing(userId: string, topic: string) {
    try {
        const { deletedCount } = await db.collection("followings").deleteOne({
            userId: new ObjectId(userId),
            topic
        });
        return deletedCount;
    } catch (error) {
        return null;
    }
}

export async function deleteFollowingsByUserId(userId: string){
    try {
        const { deletedCount } = await db.collection("followings").deleteMany({
            userId: new ObjectId(userId),
        });
        return deletedCount;
    } catch (error) {
        return null;
    }
}