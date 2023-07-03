import { fetcher } from "@/lib/fetch";

export async function addPost(post: any) {
    return await fetcher("/api/post", {
        method: "POST",
        body: JSON.stringify({
            post
        })
    });
}

export async function destroyPost(postId: string) {
    return await fetcher(`/api/post/${postId}`, {
        method: "DELETE"
    });
}
