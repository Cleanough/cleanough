import { fetcher } from "@/lib/fetch";

export async function addFollowing(topic: string) {
    return await fetcher(`/api/following?topic=${topic}`, {
        method: "POST"
    });
}

export async function destroyFollowing(topic: string) {
    return await fetcher(`/api/following?topic=${topic}`, {
        method: "DELETE"
    });
}
