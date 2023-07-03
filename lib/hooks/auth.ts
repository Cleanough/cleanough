import { fetcher } from "@/lib/fetch";
import useSWR from "swr";

export function useVerifyEmailToken(token: string) {
    const { data, isLoading, error } = useSWR(
        `/api/auth/verify-email/${token}`,
        fetcher
    );

    return {
        data,
        isLoading,
        error
    };
}
export function useResetPasswordToken(token: string) {
    const { data, isLoading, error } = useSWR(
        `/api/auth/reset-password/${token}`,
        fetcher
    );

    return {
        data,
        isLoading,
        error
    };
}
