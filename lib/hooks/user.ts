import useSWR from "swr";
import { fetcher } from "@/lib/fetch";

export function useCurrentUser() {
    const { data, error, isLoading } = useSWR("/api/user/current", fetcher);

    return {
        user: data,
        error,
        isLoading
    };
}

export function useSearchUsers(search: string) {
    const { data, error, isLoading } = useSWR(
        `/api/user?search=${search}`,
        fetcher
    );

    return {
        users: data,
        error,
        isLoading
    };
}

export function useUser(username: string) {
    const { data, error, isLoading } = useSWR(`/api/user/${username}`, fetcher);

    return {
        user: data,
        error,
        isLoading
    };
}
