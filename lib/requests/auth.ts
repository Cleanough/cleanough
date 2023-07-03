import { fetcher } from "@/lib/fetch";

export async function verifyEmail() {
    return await fetcher(`/api/auth/verify-email`, {
        method: "POST"
    });
}

export async function forgotPassword(email: string) {
    return await fetcher(`/api/auth/forgot-password`, {
        method: "POST",
        body: JSON.stringify({
            email
        })
    });
}

export async function resetPassword(token: string, data: object) {
    return await fetcher(`/api/auth/reset-password/${token}`, {
        method: "POST",
        body: JSON.stringify(data)
    });
}
