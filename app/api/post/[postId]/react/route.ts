import { use } from "@/server";
import { NextResponse } from "next/server";
import {
    database,
    roleAuthorization,
    tokenChecker
} from "@/server/middlewares";
import { userRoles } from "@/server/utils/auth";
import {
    createPostReact,
    deletePostReact,
    getPostReact,
    updatePostReact
} from "@/server/db/queries/postReact";
import { CustomNextRequest } from "@/types/next-api";
import { validate } from "@/server/validation/validate";
import status from "http-status";
import { postIdSchema, reactionSchema } from "@/server/validation/schema";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getRequestBody } from "@/server/utils/body";

export async function POST(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;
    const { searchParams, error } = validate(
        request,
        await getRequestBody(request),
        params,
        {
            paramsSchema: postIdSchema,
            searchParamsSchema: reactionSchema
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

    const reaction = searchParams.reaction as string;
    const existingPostReact = await getPostReact(
        params.postId,
        request.user.id
    );
    let react;

    if (existingPostReact) {
        if (existingPostReact?.reaction == reaction)
            react = await deletePostReact(params.postId, request.user.id);
        else
            react = await updatePostReact(
                params.postId,
                request.user.id,
                reaction
            );
    } else {
        react = await createPostReact(params.postId, request.user.id, reaction);
    }

    return response.json({
        react
    });
}
