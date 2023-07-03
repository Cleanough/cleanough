"use client";
import { redirect, useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useVerifyEmailToken } from "@/lib/hooks/auth";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function VerifyEmailToken() {
    const params = useParams();
    const router = useRouter();
    const { data, isLoading, error } = useVerifyEmailToken(params.token);
    const { data: session, update } = useSession();

    useEffect(() => {
        if (!isLoading) {
            if (error) {
                toast.error("Email Verification Failed");
                router.push("auth/verify-email");
            } else {
                toast.success("Email Successfully Verified");
                update({
                    user: { ...session?.user, emailVerified: data.user }
                }).then();
                router.push("/feed");
            }
        }
    }, [isLoading, router, error, update, data, session]);

    if (isLoading) return <div>Collecting your data for verification</div>;
}
