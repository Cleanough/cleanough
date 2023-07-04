import { use } from "@/server";
import { NextResponse } from "next/server";
import {
    database,
    roleAuthorization,
    tokenChecker
} from "@/server/middlewares";
import { createPost, getPosts } from "@/server/db/queries/post";
import { userRoles } from "@/server/utils/auth";
import status from "http-status";
import { CustomNextRequest } from "@/types/next-api";
import { validate } from "@/server/validation/validate";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { pageSchema, postSchema } from "@/server/validation/schema";
import { getRequestBody } from "@/server/utils/body";
import { createTopics } from "@/server/db/queries/topic";

export async function GET(request: CustomNextRequest, { params }: Params) {
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

    const res = await use(request, response, [
        database,
        tokenChecker,
        roleAuthorization([userRoles.ADMIN, userRoles.USER])
    ]);
    if (res) {
        return res;
    }

    const posts = await getPosts(request.user.id, Number(searchParams?.page));

    return response.json(posts);
}

export async function POST(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;
    const { body, error } = validate(
        request,
        await getRequestBody(request),
        params,
        {
            bodySchema: postSchema
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

    const { post } = body as any;

    const postTopics = post?.tabs
        ?.map((tab: any) => tab.language)
        ?.filter((language: any) => !!language);

    const postId = await createPost(request.user.id, post);

    if (postId) {
        await createTopics(postTopics);
    }

    return response.json({
        postId
    });
}
