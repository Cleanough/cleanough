import { use } from "@/server";
import { NextResponse } from "next/server";
import {
    database,
    roleAuthorization,
    tokenChecker
} from "@/server/middlewares";
import { userRoles } from "@/server/utils/auth";
import {
    createCommentReact,
    deleteCommentReact,
    getCommentReact,
    updateCommentReact
} from "@/server/db/queries/commentReact";
import { CustomNextRequest } from "@/types/next-api";
import { validate } from "@/server/validation/validate";
import status from "http-status";
import {
    commentIdSchema,
    postIdSchema,
    reactionSchema
} from "@/server/validation/schema";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getRequestBody } from "@/server/utils/body";

export async function POST(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;
    const { searchParams, error } = validate(
        request,
        await getRequestBody(request),
        params,
        {
            paramsSchema: postIdSchema.concat(commentIdSchema),
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

    const existingCommentReact = await getCommentReact(
        params.commentId,
        request.user.id
    );
    let react;

    if (existingCommentReact) {
        if (existingCommentReact?.reaction == reaction)
            react = await deleteCommentReact(params.commentId, request.user.id);
        else
            react = await updateCommentReact(
                params.commentId,
                request.user.id,
                reaction
            );
    } else {
        react = await createCommentReact(
            params.commentId,
            request.user.id,
            reaction
        );
    }

    return response.json({
        react
    });
}
