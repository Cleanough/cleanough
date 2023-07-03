import { NextResponse } from "next/server";
import { use } from "@/server";
import {
    database,
    roleAuthorization,
    tokenChecker
} from "@/server/middlewares";
import { userRoles } from "@/server/utils/auth";
import { CustomNextRequest } from "@/types/next-api";
import { deleteCommentService } from "@/server/services/comment.service";
import status from "http-status";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { validate } from "@/server/validation/validate";
import { commentIdSchema, postIdSchema } from "@/server/validation/schema";

export async function DELETE(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;
    const { error } = validate(request, null, params, {
        paramsSchema: postIdSchema.concat(commentIdSchema)
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

    const comment = await deleteCommentService(
        params.commentId,
        request.user.id
    );

    return response.json({ comment });
}
