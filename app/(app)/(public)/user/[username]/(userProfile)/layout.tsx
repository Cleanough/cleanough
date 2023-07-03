"use client";
import React from "react";

import { UserProfile } from "@/components/Profile";
import { useParams } from "next/navigation";
import { useUser } from "@/lib/hooks/user";

export default function ProfileLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const { user, isLoading, error } = useUser(params.username);

    const tabs = [
        { name: "Posts", href: `/user/${params?.username}/post` },
        { name: "Comments", href: `/user/${params?.username}/comment` }
    ];

    if (isLoading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (!user) {
        return <div className="text-center mt-4">No User Found</div>;
    }

    return (
        <div>
            <UserProfile tabs={tabs} showEdit={false} user={user} />
            {children}
        </div>
    );
}
