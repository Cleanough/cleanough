import { use } from "@/server";
import {
    database,
    roleAuthorization,
    tokenChecker
} from "@/server/middlewares";
import { NextResponse } from "next/server";
import { userRoles } from "@/server/utils/auth";
import { CustomNextRequest } from "@/types/next-api";
import { getUser } from "@/server/db/queries/user";

export async function GET(request: CustomNextRequest) {
    const response = NextResponse;

    const res = await use(request, response, [
        database,
        tokenChecker,
        roleAuthorization([userRoles.ADMIN, userRoles.USER])
    ]);
    if (res) return res;

    const user = await getUser(request.user.id);

    return response.json(user);
}
