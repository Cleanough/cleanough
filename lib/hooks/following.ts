import { fetcher } from "@/lib/fetch";
import useSWR from "swr";

export function useFollowings() {
    const { data, isLoading, error } = useSWR("/api/following", fetcher);

    return {
        followings: data,
        isLoading,
        error
    };
}
