"use client";
import { Languages } from "@/constants";
import { Topic } from "@/components/Topics";
import { useFollowings } from "@/lib/hooks/following";
import { useEffect, useState } from "react";

export default function Topics() {
    const [followingTopics, setFollowingTopics] = useState<Array<string>>();
    const { followings } = useFollowings();

    useEffect(() => {
        const followingTopics = followings?.map(
            (following: any) => following.topic
        );
        setFollowingTopics(followingTopics);
    }, [followings]);

    return (
        <div className="w-min mx-auto space-y-4 mt-4">
            {Languages.map((language) => (
                <Topic
                    key={language.name}
                    language={language}
                    followingTopics={followingTopics}
                />
            ))}
        </div>
    );
}
