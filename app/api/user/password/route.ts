import { CustomNextRequest } from "@/types/next-api";
import { NextResponse } from "next/server";
import { use } from "@/server";
import { validate } from "@/server/validation/validate";
import {
    database,
    roleAuthorization,
    tokenChecker
} from "@/server/middlewares";
import { userRoles, verifyPassword } from "@/server/utils/auth";
import { getUserWithPassword, updatePassword } from "@/server/db/queries/user";
import status from "http-status";
import { updatePasswordSchema } from "@/server/validation/schema";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getRequestBody } from "@/server/utils/body";

export async function POST(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;
    const { body, error } = validate(
        request,
        await getRequestBody(request),
        params,
        {
            bodySchema: updatePasswordSchema
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

    const { oldPassword, newPassword } = body as any;

    const user = await getUserWithPassword(request.user.id);

    const verify = await verifyPassword(oldPassword, user.password);

    if (!verify)
        return response.json(
            { error: { oldPassword: "Invalid old password" } },
            {
                status: status.BAD_REQUEST,
                statusText: status[status.BAD_REQUEST]
            }
        );

    const password = await updatePassword(request.user.id, newPassword);

    return response.json(password);
}
