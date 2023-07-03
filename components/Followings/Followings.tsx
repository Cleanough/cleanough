"use client";
import { useFollowings } from "@/lib/hooks/following";
import { Following } from "@/components/Followings";
export default function Followings() {
    const { followings } = useFollowings();

    if (!followings?.length)
        return (
            <div className="w-full text-center space-y-4 mt-4">
                No following yet
            </div>
        );

    return (
        <div className="w-full sm:w-min mx-auto space-y-4 mt-4">
            {followings?.map((language: any) => (
                <Following key={language.topic} language={language} />
            ))}
        </div>
    );
}
