import { use } from "@/server";
import { NextResponse } from "next/server";
import {
    database,
    roleAuthorization,
    tokenChecker
} from "@/server/middlewares";
import { getCommentPostsByUser } from "@/server/db/queries/post";
import { CustomNextRequest } from "@/types/next-api";
import { userRoles } from "@/server/utils/auth";
import { validate } from "@/server/validation/validate";
import { getRequestBody } from "@/server/utils/body";
import { pageSchema } from "@/server/validation/schema";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import status from "http-status";

export async function GET(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;

    const { searchParams, error } = validate(
        request,
        await getRequestBody(request),
        params,
        {
            searchParamsSchema: pageSchema
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

    const posts = await getCommentPostsByUser(
        request.user.id,
        Number(searchParams?.page)
    );

    return response.json(posts);
}
