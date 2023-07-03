import { use } from "@/server";
import { NextRequest, NextResponse } from "next/server";
import { database } from "@/server/middlewares";
import { getUserByUsername } from "@/server/db/queries/user";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(request: NextRequest, { params }: Params) {
    const response = NextResponse;

    const res = await use(request, response, [database]);
    if (res) return res;

    const user = await getUserByUsername(params.username as string);

    return response.json(user);
}
