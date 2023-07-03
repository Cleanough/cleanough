import { fetcher } from "@/lib/fetch";
import useSWR from "swr";
export function useCommentReact(postId: string, commentId: string) {
    const { data } = useSWR(
        `/api/post/${postId}/comment/${commentId}/react/check`,
        fetcher
    );
    return data?.reaction;
}
