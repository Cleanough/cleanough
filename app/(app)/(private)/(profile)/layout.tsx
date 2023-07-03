"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { UserProfile } from "@/components/Profile";
import { User } from "@/types/next-env";

const tabs = [
    { name: "Posts", href: "/post" },
    { name: "Comments", href: "/comment" },
    { name: "Bookmarks", href: "/bookmark" }
];

export default function ProfileLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const { data: session } = useSession();

    return (
        <div>
            <UserProfile
                tabs={tabs}
                showEdit={false}
                user={session?.user as User}
            />
            {children}
        </div>
    );
}
