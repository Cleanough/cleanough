import { compare, genSalt, hash } from "bcryptjs";

export const hashPassword = async (password: string) => {
    const salt = await genSalt(10);
    return await hash(password, salt);
};

export const verifyPassword = async (
    plainPassword: string,
    hashedPassword: string
) => {
    return await compare(plainPassword, hashedPassword);
};

export const userRoles = {
    ADMIN: "admin",
    USER: "user"
};
