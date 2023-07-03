import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/db/connection";
import status from "http-status";

export async function database(
    req: NextRequest | null,
    res: typeof NextResponse | null
) {
    const error = await connectDB();
    if (error) {
        if (res)
            return res.json(null, {
                status: status.BAD_GATEWAY,
                statusText: status[status.BAD_GATEWAY]
            });
        else throw new Error("Bad Gateway");
    }
}
