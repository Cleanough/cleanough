import { NextRequest } from "next/server";

export type CustomNextRequest = NextRequest & {
    user: {
        id: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        emailVerified: Date | null;
        role: string;
    };
};
