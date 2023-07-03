import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function use(
    request: NextRequest | NextApiRequest,
    response: typeof NextResponse | NextApiResponse,
    functions: Array<Function>
) {
    for (const func of functions) {
        const res = await func(request, response);
        if (res) {
            return res;
        }
    }
}
