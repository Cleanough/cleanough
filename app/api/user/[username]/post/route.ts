import { use } from "@/server";
import { NextRequest, NextResponse } from "next/server";
import { database } from "@/server/middlewares";
import { getPostsByUsername } from "@/server/db/queries/post";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { validate } from "@/server/validation/validate";
import { getRequestBody } from "@/server/utils/body";
import { pageSchema } from "@/server/validation/schema";
import status from "http-status";

export async function GET(request: NextRequest, { params }: Params) {
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

    const res = await use(request, response, [database]);
    if (res) {
        return res;
    }

    const post = await getPostsByUsername(
        params.username,
        Number(searchParams.page)
    );

    return response.json(post);
}
