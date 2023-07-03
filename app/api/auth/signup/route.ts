import { use } from "@/server";
import { NextRequest, NextResponse } from "next/server";
import { database } from "@/server/middlewares";
import { validate } from "@/server/validation/validate";
import { registerUserService } from "@/server/services/auth.service";
import { signupSchema } from "@/server/validation/schema";
import status from "http-status";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getRequestBody } from "@/server/utils/body";

export async function POST(request: NextRequest, { params }: Params) {
    const response = NextResponse;
    const { body, error } = validate(
        request,
        await getRequestBody(request),
        params,
        {
            bodySchema: signupSchema
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

    const { username, email, password, confirmPassword } = body as any;

    const res = await use(request, response, [database]);
    if (res) return res;

    const user = await registerUserService(username, email, password);

    return NextResponse.json(user[0], user[1]);
}
