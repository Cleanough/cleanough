import { fetcher } from "@/lib/fetch";

export async function addOrRemovePostBookmark(postId: string) {
    return await fetcher(`/api/post/${postId}/bookmark`, {
        method: "POST"
    });
}
