import { NextResponse } from "next/server";
import { CustomNextRequest } from "@/types/next-api";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { validate } from "@/server/validation/validate";
import { getRequestBody } from "@/server/utils/body";
import { resetPasswordSchema, tokenSchema } from "@/server/validation/schema";
import status from "http-status";
import { decode } from "next-auth/jwt";
import {
    updatePassword,
    updatePasswordByEmail
} from "@/server/db/queries/user";
import { mockSession } from "next-auth/client/__tests__/helpers/mocks";
import user = mockSession.user;
import { use } from "@/server";
import { database } from "@/server/middlewares";

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

    try {
        const value = await decode({
            token: params.token,
            secret: process.env.NEXTAUTH_SECRET!
        });
    } catch (e: any) {
        return response.json(
            { error: e.code },
            {
                status: status.UNAUTHORIZED,
                statusText: status[status.UNAUTHORIZED]
            }
        );
    }

    return response.json({});
}

export async function POST(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;

    const { body, error } = validate(
        request,
        await getRequestBody(request),
        params,
        {
            paramsSchema: tokenSchema,
            bodySchema: resetPasswordSchema
        }
    );
    if (error) {
        return NextResponse.json(
            { error: status[status.BAD_REQUEST] },
            {
                status: status.BAD_REQUEST,
                statusText: status[status.BAD_REQUEST]
            }
        );
    }

    const res = await use(request, response, [database]);
    if (res) return res;

    try {
        const value = await decode({
            token: params.token,
            secret: process.env.NEXTAUTH_SECRET!
        });

        if (value?.type !== "forgot_password") {
            return response.json(
                { error: status[status.UNAUTHORIZED] },
                {
                    status: status.UNAUTHORIZED,
                    statusText: status[status.UNAUTHORIZED]
                }
            );
        }
        let user;
        if (value) {
            user = await updatePasswordByEmail(value.email, body.newPassword);
        }
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
