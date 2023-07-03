import { NextRequest } from "next/server";

export default async function middlewares(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/api")) {
    }
}
