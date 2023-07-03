"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";

export default function Guest({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();

    if (status != "loading" && !session) {
        return <>{children}</>;
    }

    if (status != "loading" && session && !session.user.emailVerified) {
        if (searchParams.get("intended"))
            redirect(searchParams.get("intended") as string);
        redirect("/auth/verify-email");
    }

    if (status != "loading" && session) {
        if (searchParams.get("intended"))
            redirect(searchParams.get("intended") as string);
        redirect("/feed");
    }

    return null;
}
