"use client";
import { useFollowings } from "@/lib/hooks/following";
import { Following } from "@/components/Followings";
export default function Followings() {
    const { followings } = useFollowings();

    return (
        <div className="w-min mx-auto space-y-4 mt-4">
            {followings?.map((language: any) => (
                <Following key={language.topic} language={language} />
            ))}
        </div>
    );
}
