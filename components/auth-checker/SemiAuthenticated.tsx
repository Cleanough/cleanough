"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

export default function SemiAuthenticated({
    children,
    access
}: {
    children: React.ReactNode;
    access: Array<string>;
}) {
    const pathname = usePathname();
    const { data: session, status, update } = useSession();

    if (status == "unauthenticated" && !session) {
        redirect(`/auth/signin?intended=${pathname}`);
    }

    if (
        status == "authenticated" &&
        session &&
        session.user.emailVerified &&
        access.includes(session.user?.role)
    )
        redirect("/feed");

    if (
        status == "authenticated" &&
        session &&
        access.includes(session.user?.role)
    )
        return <div>{children}</div>;

    return null;
}
