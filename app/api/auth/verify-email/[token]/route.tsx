import { NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import { use } from "@/server";
import {
    database,
    roleAuthorization,
    semiTokenChecker,
    tokenChecker
} from "@/server/middlewares";
import { userRoles } from "@/server/utils/auth";
import { CustomNextRequest } from "@/types/next-api";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import status from "http-status";
import { verifyUserEmail } from "@/server/db/queries/user";
import { validate } from "@/server/validation/validate";
import { getRequestBody } from "@/server/utils/body";
import { tokenSchema } from "@/server/validation/schema";

export async function GET(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;
    const { error } = validate(request, await getRequestBody(request), params, {
        paramsSchema: tokenSchema
    });

    if (error) {
        return NextResponse.json(
            { error: status[status.BAD_REQUEST] },
            {
                status: status.BAD_REQUEST,
                statusText: status[status.BAD_REQUEST]
            }
        );
    }

    const res = await use(request, response, [
        database,
        semiTokenChecker,
        roleAuthorization([userRoles.USER, userRoles.ADMIN])
    ]);
    if (res) return res;

    try {
        const value = await decode({
            token: params.token,
            secret: process.env.NEXTAUTH_SECRET!
        });
        if (
            request.user.email != value?.email ||
            request.user.username != value.username ||
            request.user.id != value.sub ||
            value.type != "email_verification"
        ) {
            return response.json(
                { error: status[status.UNAUTHORIZED] },
                {
                    status: status.UNAUTHORIZED,
                    statusText: status[status.UNAUTHORIZED]
                }
            );
        }

        let user;
        if (!request.user.emailVerified)
            user = await verifyUserEmail(request.user.id);

        return response.json({ user });
    } catch (e: any) {
        return response.json(
            { error: e.code },
            {
                status: status.UNAUTHORIZED,
                statusText: status[status.UNAUTHORIZED]
            }
        );
    }
}
