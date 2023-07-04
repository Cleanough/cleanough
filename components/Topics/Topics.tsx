"use client";
import { Languages } from "@/constants";
import { Topic } from "@/components/Topics";
import { useFollowings } from "@/lib/hooks/following";
import { useEffect, useState } from "react";
import { useTopics } from "@/lib/hooks/topic";

export default function Topics() {
    const { topics, isLoading, error } = useTopics();
    const [followingTopics, setFollowingTopics] = useState<Array<string>>();
    const { followings } = useFollowings();

    useEffect(() => {
        const followingTopics = followings?.map(
            (following: any) => following.topic
        );
        setFollowingTopics(followingTopics);
    }, [followings]);

    if (isLoading) {
        return (
            <div className="w-full sm:w-min mx-auto space-y-4 mt-4">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full sm:w-min mx-auto space-y-4 mt-4">Error</div>
        );
    }

    return (
        <div className="w-full sm:w-min mx-auto space-y-4 mt-4">
            {topics.topics.map((topic: any) => (
                <Topic
                    key={topic.name}
                    language={
                        Languages.filter(
                            (language) => language.name === topic.name
                        )[0]
                    }
                    followingTopics={followingTopics}
                />
            ))}
        </div>
    );
}
