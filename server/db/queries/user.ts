import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { db } from "../connection";

export async function getUserByEmail(email: string) {
    return db
        .collection("users")
        .findOne({ email }, { projection: dbProjectionUsers() })
        .then((user: object) => user || null);
}

export async function getUserByUsername(username: string) {
    return db
        .collection("users")
        .findOne({ username }, { projection: dbProjectionUsers() })
        .then((user: object) => user || null);
}

export function dbProjectionUsers(prefix = "") {
    return {
        [`${prefix}password`]: 0
    };
}

export async function getUser(id: string) {
    return await db.collection("users").findOne(
        {
            _id: new ObjectId(id)
        },
        { projection: dbProjectionUsers() }
    );
}

export async function getUserWithPassword(id: string) {
    return await db.collection("users").findOne({
        _id: new ObjectId(id)
    });
}

export async function updatePassword(id: string, password: string) {
    const newPassword = await bcrypt.hash(password, 10);

    const { matchedCount } = await db.collection("users").updateOne(
        {
            _id: new ObjectId(id)
        },
        { $set: { password: newPassword } }
    );
    return matchedCount;
}

export async function updatePasswordByEmail(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { matchedCount } = await db.collection("users").updateOne(
        {
            email
        },
        { $set: { password: hashedPassword } }
    );
    return matchedCount;
}

export async function registerUser(user: {
    username: string;
    email: string;
    password?: string;
    role: string;
}) {
    let password;
    if (user.password) password = bcrypt.hashSync(user.password, 10);
    else password = undefined;

    const newUser = {
        ...user,
        password,
        emailVerified: null,
        createdAt: new Date(),
        modifiedAt: new Date()
    };

    const { insertedId } = await db.collection("users").insertOne(newUser);
    return insertedId;
}

export async function registerVerifiedProviderUser(user: {
    username: string;
    email: string;
    role: string;
}) {
    const newUser = {
        ...user,
        emailVerified: new Date(),
        createdAt: new Date(),
        modifiedAt: new Date()
    };

    const { insertedId } = await db.collection("users").insertOne(newUser);
    return insertedId;
}

export async function addSuperAdmin() {
    const password = await bcrypt.hash(process.env.SEED_ADMIN_PASS!, 10);
    const user = {
        email: process.env.SEED_ADMIN_EMAIL,
        username: process.env.SEED_ADMIN_USERNAME,
        password,
        role: "admin",
        emailVerified: new Date()
    };
    return await db.collection("users").insertOne(user);
}
export async function updateUser(
    id: string,
    updatedData: {
        firstName?: string;
        lastName?: string;
        username?: string;
        email?: string;
        role?: string;
        emailVerified?: boolean;
    }
) {
    const updatedUser = { ...updatedData, modifiedAt: new Date() };

    const { matchedCount } = await db
        .collection("users")
        .updateOne({ _id: new ObjectId(id) }, { $set: updatedUser });
    return matchedCount;
}

export async function deleteUser(id: string) {
    const { deletedCount } = await db.collection("users").deleteOne({
        _id: new ObjectId(id)
    });
    return deletedCount;
}

export async function findUser(search: string, userId: string) {
    const searchTerms = search.split(" ");

    const regexArray = searchTerms.map((term) => ({
        $or: [
            { username: { $regex: term, $options: "i" } },
            { firstName: { $regex: term, $options: "i" } },
            { lastName: { $regex: term, $options: "i" } }
        ]
    }));

    return await db
        .collection("users")
        .find(
            {
                $and: [
                    { $or: regexArray },
                    { _id: { $ne: new ObjectId(userId) } },
                    { role: { $ne: "admin" } }
                ]
            },
            {
                projection: {
                    createdAt: 0,
                    modifiedAt: 0,
                    password: 0,
                    role: 0
                }
            }
        )
        .toArray();
}

export async function verifyUserEmail(id: string) {
    const date = new Date();
    const user = await db.collection("users").updateOne(
        {
            _id: new ObjectId(id)
        },
        { $set: { emailVerified: date } }
    );
    return user.matchedCount ? date : null;
}
