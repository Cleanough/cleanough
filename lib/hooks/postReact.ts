import { fetcher } from "@/lib/fetch";
import useSWR from "swr";
export function usePostReact(postId: string) {
    const { data } = useSWR(`/api/post/${postId}/react/check`, fetcher);
    return data?.reaction;
}
