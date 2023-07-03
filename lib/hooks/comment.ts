import useSWR from "swr";
import { fetcher } from "@/lib/fetch";

export function useComments(postId: string, page: number) {
    if (page == -1) page = 0;
    const { data, error, isLoading } = useSWR(
        `/api/post/${postId}/comment?page=${page}`,
        fetcher
    );

    return {
        comments: data,
        error,
        isLoading
    };
}
