import { use } from "@/server";
import { NextResponse } from "next/server";
import {
    database,
    roleAuthorization,
    tokenChecker
} from "@/server/middlewares";
import { userRoles } from "@/server/utils/auth";
import { getCommentReact } from "@/server/db/queries/commentReact";
import status from "http-status";
import { CustomNextRequest } from "@/types/next-api";
import { validate } from "@/server/validation/validate";
import { commentIdSchema, postIdSchema } from "@/server/validation/schema";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(request: CustomNextRequest, { params }: Params) {
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
    if (res?.status == status.UNAUTHORIZED) {
        return response.json(null);
    }
    if (res) return res;

    const react = await getCommentReact(params.commentId, request.user.id);

    return response.json({
        ...react
    });
}
