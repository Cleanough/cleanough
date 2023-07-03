import { NextRequest } from "next/server";

export async function getRequestBody(request: NextRequest) {
    try {
        return await request.json();
    } catch (e) {
        return null;
    }
}
