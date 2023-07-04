import { CustomNextRequest } from "@/types/next-api";
import { NextResponse } from "next/server";
import { use } from "@/server";
import {
    database,
    roleAuthorization,
    tokenChecker
} from "@/server/middlewares";
import { userRoles } from "@/server/utils/auth";
import { getTopics } from "@/server/db/queries/topic";

export async function GET(request: CustomNextRequest) {
    const response = NextResponse;

    const res = await use(request, response, [
        database,
        tokenChecker,
        roleAuthorization([userRoles.ADMIN, userRoles.USER])
    ]);
    if (res) return res;

    const topics = await getTopics();

    return response.json({ topics });
}
