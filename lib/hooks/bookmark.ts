import { fetcher } from "@/lib/fetch";
import useSWR from "swr";
export function usePostBookmark(postId: string) {
    const { data } = useSWR(`/api/post/${postId}/bookmark/check`, fetcher);
    return data?._id;
}
