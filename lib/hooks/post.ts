import useSWR from "swr";
import { fetcher } from "@/lib/fetch";
import useSWRInfinite from "swr/infinite";

export function usePost(postId: string) {
    const { data, error, isLoading } = useSWR(`/api/post/${postId}`, fetcher);

    return {
        post: data,
        error,
        isLoading
    };
}

export function usePosts(type: string, username?: string) {
    let path: string;
    switch (type) {
        case "feed":
            path = "/api/feed";
            break;
        case "post":
            path = "/api/post";
            break;
        case "bookmark":
            path = "/api/bookmark";
            break;
        case "comment":
            path = "/api/comment";
            break;
        case `user/${username}/post`:
            path = `/api/user/${username}/post`;
            break;
        case `user/${username}/comment`:
            path = `/api/user/${username}/comment`;
            break;
    }
    const { data, error, size, setSize, mutate, isLoading } = useSWRInfinite(
        (index) => `${path}?page=${index + 1}`,
        fetcher
    );

    return {
        data,
        error,
        isLoading,
        size,
        setSize,
        mutate
    };
}
