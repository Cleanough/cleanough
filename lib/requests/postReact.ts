import { fetcher } from "@/lib/fetch";

export async function addOrRemovePostReact(postId: string, reaction: string) {
    return await fetcher(`/api/post/${postId}/react?reaction=${reaction}`, {
        method: "POST"
    });
}
