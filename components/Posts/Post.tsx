"use client";

import { useState } from "react";
import { Comments } from "../Comments";
import {
    CodeEditorSidebar,
    CodeEditorTabs,
    CodeViewer
} from "@/components/Core";
import { usePostReact } from "@/lib/hooks/postReact";
import { addOrRemovePostReact } from "@/lib/requests/postReact";
import { mutate } from "swr";
import { usePostUtilsContext } from "@/components/Provider";
import status from "http-status";
import { useRouter } from "next/navigation";
import { destroyPost } from "@/lib/requests/post";
import Link from "next/link";
import { toast } from "react-hot-toast";

type Tab = {
    id: number;
    name: string;
    language: string;
    value: string;
};

type PostProps = {
    post: any;
};

export default function Post({ post }: PostProps) {
    const [tabs, setTabs] = useState<Array<Tab>>(post.tabs);
    const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
    const [showFullScreen, setShowFullScreen] = useState(false);
    const reaction = usePostReact(post._id);
    const { mutatePost } = usePostUtilsContext();
    const router = useRouter();

    async function handleUpvote() {
        try {
            await addOrRemovePostReact(post._id, "upvote");
        } catch (e) {
            toast.error("Unauthorized");
            if (e == status[status.UNAUTHORIZED]) router.push("/auth/signin");
        }
        await mutate(`/api/post/${post._id}/react/check`);
        await mutatePost();
    }

    async function handleDownvote() {
        try {
            await addOrRemovePostReact(post._id, "downvote");
        } catch (e) {
            toast.error("Unauthorized");
            if (e == status[status.UNAUTHORIZED]) router.push("/auth/signin");
        }
        await mutate(`/api/post/${post._id}/react/check`);
        await mutatePost();
    }

    async function handleDelete() {
        const loadingToast = toast.loading("Deleting...");
        try {
            await destroyPost(post._id);
        } catch (e) {
            if (typeof e == "string") toast.error(e);
            if (e == status[status.UNAUTHORIZED]) router.push("/auth/signin");
        }
        toast.dismiss(loadingToast);
        toast.success("Deleted");
        await mutatePost();
    }

    return (
        <div className="shadow rounded-lg p-4 bg-white">
            <div className="flex items-center gap-x-2">
                <div className="h-10 w-10 rounded-full bg-[#2e2e2e] flex justify-center items-center text-white text-2xl font-bold select-none">
                    {post.user.username[0]}
                </div>
                <div>
                    <Link href={`/user/${post.user.username}/post`}>
                        {post.user.username}
                    </Link>
                    <p className="text-xs">
                        {new Date(post.createdAt).toDateString()}
                    </p>
                </div>
            </div>
            <div
                className={`border overflow-hidden ${
                    showFullScreen
                        ? "fixed top-0 left-0 right-0 bottom-0 z-10 mt-0 w-full"
                        : "mt-4 w-[350px] sm:w-[550px] relative"
                }`}
            >
                <div className="flex">
                    <CodeEditorSidebar
                        readonly={true}
                        post={post}
                        setShowFullScreen={setShowFullScreen}
                        showFullScreen={showFullScreen}
                        type={"post"}
                        reaction={reaction}
                        handleUpvote={handleUpvote}
                        handleDownvote={handleDownvote}
                        handleDelete={handleDelete}
                    />
                    <div className="w-full">
                        <CodeEditorTabs
                            tabs={tabs}
                            setTabs={setTabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            readOnly={true}
                            showFullScreen={showFullScreen}
                        />
                        <CodeViewer
                            activeTab={activeTab}
                            showFullScreen={showFullScreen}
                        />
                    </div>
                </div>
                <Comments
                    post={post}
                    showFullScreen={showFullScreen}
                    setShowFullScreen={setShowFullScreen}
                    commentCounts={post.commentCounts}
                />
            </div>
        </div>
    );
}
