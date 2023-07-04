import useSWR from "swr";
import {fetcher} from "@/lib/fetch";

export function useTopics(){
    const {data, isLoading, error} = useSWR('/api/topic', fetcher);

    return {
        topics: data,
        error,
        isLoading
    };
}