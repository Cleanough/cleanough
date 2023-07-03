import { use } from "@/server";
import { NextRequest, NextResponse } from "next/server";
import {
    database,
    roleAuthorization,
    tokenChecker
} from "@/server/middlewares";
import { getPost } from "@/server/db/queries/post";
import { userRoles } from "@/server/utils/auth";
import { CustomNextRequest } from "@/types/next-api";
import { deletePostService } from "@/server/services/post.service";
import { validate } from "@/server/validation/validate";
import { postIdSchema } from "@/server/validation/schema";
import status from "http-status";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(request: NextRequest, { params }: Params) {
    const response = NextResponse;
    const { error } = validate(request, null, params, {
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

    const res = await use(request, response, [database]);
    if (res) return res;

    const post = await getPost(params.postId);
    if (post.length) {
        return response.json(post[0], { status: 200 });
    }
    return response.json(null, { status: 200 });
}

export async function DELETE(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;
    const { error } = validate(request, null, params, {
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

    const post = await deletePostService(params.postId, request.user.id);

    return response.json(post);
}
