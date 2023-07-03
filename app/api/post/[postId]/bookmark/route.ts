import { use } from "@/server";
import { NextResponse } from "next/server";
import {
    database,
    roleAuthorization,
    tokenChecker
} from "@/server/middlewares";
import { userRoles } from "@/server/utils/auth";
import {
    createPostBookmark,
    deletePostBookmark,
    getPostBookmark
} from "@/server/db/queries/bookmark";
import { CustomNextRequest } from "@/types/next-api";
import status from "http-status";
import { validate } from "@/server/validation/validate";
import { postIdSchema } from "@/server/validation/schema";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getRequestBody } from "@/server/utils/body";

export async function POST(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;
    const { error } = validate(request, await getRequestBody(request), params, {
        paramsSchema: postIdSchema
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
        tokenChecker,
        roleAuthorization([userRoles.ADMIN, userRoles.USER])
    ]);
    if (res) return res;

    const existingBookmark = await getPostBookmark(
        params.postId,
        request.user.id
    );
    let bookmark;

    if (existingBookmark) {
        bookmark = await deletePostBookmark(params.postId, request.user.id);
    } else {
        bookmark = await createPostBookmark(params.postId, request.user.id);
    }

    return response.json({
        bookmark
    });
}
