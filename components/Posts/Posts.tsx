"use client";
import { usePosts } from "@/lib/hooks/post";
import { PostUtilsProvider } from "@/components/Provider";
import { NewPost, Post } from "@/components/Posts/index";
import { useEffect, useState } from "react";
import Link from "next/link";

type PostsProps = {
    type: string;
    username?: string;
};

export default function Posts({ type, username }: PostsProps) {
    const { data, error, isLoading, size, setSize, mutate } = usePosts(
        type,
        username
    );
    const [posts, setPosts] = useState<any[]>();
    const [loadMore, setLoadMore] = useState(true);

    useEffect(() => {
        const posts = data?.flat();
        if (
            data &&
            data.length > 1 &&
            data[data?.length - 1].length == data[data?.length - 2].length
        )
            setLoadMore(false);
        else setPosts(posts);
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if (posts?.length == 0) {
        return (
            <PostUtilsProvider type={type} mutatePost={mutate}>
                {type === "feed" && <NewPost />}
                {type === "feed" ? (
                    <div>
                        Follow{" "}
                        <Link href="/topic" className="underline">
                            Topics
                        </Link>{" "}
                        to get related posts
                    </div>
                ) : (
                    <div>No Post Found</div>
                )}
            </PostUtilsProvider>
        );
    }

    return (
        <PostUtilsProvider type={type} mutatePost={mutate}>
            {type === "feed" && <NewPost />}
            {posts?.map((post: any) => (
                <Post key={post._id} post={post} />
            ))}
            {loadMore && (
                <div>
                    <button
                        onClick={() => setSize(size + 1)}
                        className="flex items-center justify-center gap-x-2 py-2 px-4 bg-gray-100 text-sm duration-150 hover:bg-gray-200 active:bg-gray-200 rounded-lg md:inline-flex"
                    >
                        Load More
                    </button>
                </div>
            )}
        </PostUtilsProvider>
    );
}
