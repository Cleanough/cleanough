import { use } from "@/server";
import { NextRequest, NextResponse } from "next/server";
import {
    database,
    roleAuthorization,
    tokenChecker
} from "@/server/middlewares";
import {
    createCommentByUserId,
    getCommentsByPostId
} from "@/server/db/queries/comment";
import { userRoles } from "@/server/utils/auth";
import status from "http-status";
import { CustomNextRequest } from "@/types/next-api";
import { validate } from "@/server/validation/validate";
import {
    commentSchema,
    pageSchema,
    postIdSchema
} from "@/server/validation/schema";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getRequestBody } from "@/server/utils/body";

export async function GET(request: NextRequest, { params }: Params) {
    const response = NextResponse;

    const { searchParams, error } = validate(request, null, params, {
        paramsSchema: postIdSchema,
        searchParamsSchema: pageSchema
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

    const res = await use(request, response, [database]);
    if (res) return res;

    const page = searchParams.page as string;
    const posts = await getCommentsByPostId(params.postId, Number(page ?? 0));

    return response.json(posts);
}

export async function POST(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;
    const { body, error } = validate(
        request,
        await getRequestBody(request),
        params,
        {
            bodySchema: commentSchema,
            paramsSchema: postIdSchema
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

    const { comment } = body as any;

    const commentId = await createCommentByUserId(
        request.user.id,
        params.postId,
        comment
    );

    return response.json({
        commentId
    });
}
