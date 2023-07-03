import { fetcher } from "@/lib/fetch";

export async function addOrRemoveCommentReact(
    postId: string,
    commentId: string,
    reaction: string
) {
    return await fetcher(
        `/api/post/${postId}/comment/${commentId}/react?reaction=${reaction}`,
        {
            method: "POST"
        }
    );
}
