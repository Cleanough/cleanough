import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import status from "http-status";
import { CustomNextRequest } from "@/types/next-api";

export async function tokenChecker(
    req: CustomNextRequest,
    res: typeof NextResponse
) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });
    if (!token)
        return res.json(
            { error: status[status.UNAUTHORIZED] },
            {
                status: status.UNAUTHORIZED,
                statusText: status[status.UNAUTHORIZED]
            }
        );
    const {
        email,
        sub: _id,
        username,
        firstName,
        lastName,
        role,
        emailVerified
    } = token;
    if (!token.emailVerified)
        return res.json(
            { error: status[status.UNAUTHORIZED] },
            {
                status: status.UNAUTHORIZED,
                statusText: status[status.UNAUTHORIZED]
            }
        );
    req.user = {
        id: _id as string,
        email: email as string,
        username: username as string,
        firstName: firstName as string,
        lastName: lastName as string,
        emailVerified: emailVerified as Date | null,
        role: role as string
    };
}

export async function semiTokenChecker(
    req: CustomNextRequest,
    res: typeof NextResponse
) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });
    if (!token)
        return res.json(
            { error: status[status.UNAUTHORIZED] },
            {
                status: status.UNAUTHORIZED,
                statusText: status[status.UNAUTHORIZED]
            }
        );
    const {
        email,
        sub: _id,
        username,
        firstName,
        lastName,
        role,
        emailVerified
    } = token;
    req.user = {
        id: _id as string,
        email: email as string,
        username: username as string,
        firstName: firstName as string,
        lastName: lastName as string,
        emailVerified: emailVerified as Date | null,
        role: role as string
    };
}

export function roleAuthorization(roles: Array<string>) {
    return (req: CustomNextRequest, res: typeof NextResponse) => {
        if (!roles.includes(req.user.role))
            return res.json(
                { error: status[status.FORBIDDEN] },
                {
                    status: status.FORBIDDEN,
                    statusText: status[status.FORBIDDEN]
                }
            );
    };
}
