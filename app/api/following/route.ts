import { use } from "@/server";
import { NextResponse } from "next/server";
import {
    database,
    roleAuthorization,
    tokenChecker
} from "@/server/middlewares";
import {
    createFollowing,
    deleteFollowing,
    getFollowingsByUserId
} from "@/server/db/queries/following";
import { userRoles } from "@/server/utils/auth";
import { CustomNextRequest } from "@/types/next-api";
import { validate } from "@/server/validation/validate";
import { topicSchema } from "@/server/validation/schema";
import status from "http-status";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getRequestBody } from "@/server/utils/body";

export async function GET(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;

    const res = await use(request, response, [
        database,
        tokenChecker,
        roleAuthorization([userRoles.ADMIN, userRoles.USER])
    ]);
    if (res) {
        return res;
    }

    const followings = await getFollowingsByUserId(request.user.id);

    return response.json(followings);
}

export async function POST(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;
    const { searchParams, error } = validate(
        request,
        await getRequestBody(request),
        params,
        {
            searchParamsSchema: topicSchema
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

    const topic = searchParams.topic;

    const followingId = await createFollowing(request.user.id, topic as string);

    return response.json({
        followingId
    });
}

export async function DELETE(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;
    const { searchParams, error } = validate(
        request,
        await getRequestBody(request),
        params,
        {
            searchParamsSchema: topicSchema
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

    const topic = searchParams.topic;

    const followingId = await deleteFollowing(request.user.id, topic as string);

    return response.json({
        followingId
    });
}
