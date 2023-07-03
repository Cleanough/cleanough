import { fetcher } from "@/lib/fetch";

export async function addComment(postId: string, comment: any) {
    return await fetcher(`/api/post/${postId}/comment`, {
        method: "POST",
        body: JSON.stringify({
            comment
        })
    });
}

export async function destroyComment(postId: string, commentId: string) {
    return await fetcher(`/api/post/${postId}/comment/${commentId}`, {
        method: "DELETE"
    });
}
