import { use } from "@/server";
import { NextResponse } from "next/server";
import {
    database,
    roleAuthorization,
    tokenChecker
} from "@/server/middlewares";
import { userRoles } from "@/server/utils/auth";
import {
    findUser,
    getUserByUsername,
    updateUser
} from "@/server/db/queries/user";
import { CustomNextRequest } from "@/types/next-api";
import { validate } from "@/server/validation/validate";
import { deleteUserService } from "@/server/services/user.service";
import status from "http-status";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getRequestBody } from "@/server/utils/body";

export async function GET(request: CustomNextRequest) {
    const response = NextResponse;

    const res = await use(request, response, [
        database,
        tokenChecker,
        roleAuthorization([userRoles.ADMIN, userRoles.USER])
    ]);
    if (res) {
        return res;
    }

    const search = request.nextUrl.searchParams.get("search");

    const users = await findUser(search as string, request.user.id);

    return response.json(users);
}

export async function PUT(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;
    const { body, error } = validate(
        request,
        await getRequestBody(request),
        params,
        {
            // bodySchema: updateUserSchema,
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

    const res = await use(request, response, [
        database,
        tokenChecker,
        roleAuthorization([userRoles.ADMIN, userRoles.USER])
    ]);
    if (res) return res;

    const { username, firstName, lastName } = body as any;

    const existingUser = await getUserByUsername(username);

    if (existingUser && request.user.username !== username)
        return NextResponse.json(
            { error: { username: "Username already exists" } },
            {
                status: status.BAD_REQUEST,
                statusText: status[status.BAD_REQUEST]
            }
        );

    const user = await updateUser(request.user.id, {
        username,
        firstName,
        lastName
    });

    return response.json(user);
}

export async function DELETE(request: CustomNextRequest) {
    const response = NextResponse;

    const res = await use(request, response, [
        database,
        tokenChecker,
        roleAuthorization([userRoles.ADMIN, userRoles.USER])
    ]);
    if (res) return res;

    const user = await deleteUserService(request.user.id);

    return response.json({ user });
}
