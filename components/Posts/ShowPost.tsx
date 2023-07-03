"use client";
import { usePost } from "@/lib/hooks/post";
import { mutate } from "swr";
import { PostUtilsProvider } from "@/components/Provider";
import { Post } from "@/components/Posts/index";

export default function ShowPost({ postId }: { postId: string }) {
    const { post, isLoading, error } = usePost(postId);

    if (isLoading) return <div>Loading...</div>;

    if (!post) return <div>No Post Found</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <PostUtilsProvider
            type={`/post/${post._id}`}
            mutatePost={async () => await mutate(`/api/post/${post._id}`)}
        >
            <Post post={post} />
        </PostUtilsProvider>
    );
}
