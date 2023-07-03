"use client";
import { useEffect, useState } from "react";
import {
    CodeEditorSidebar,
    CodeEditorTabs,
    CodeViewer,
    DiffViewer
} from "@/components/Core";
import { useCommentReact } from "@/lib/hooks/commentReact";
import { mutate } from "swr";
import { addOrRemoveCommentReact } from "@/lib/requests/commentReact";
import { destroyComment } from "@/lib/requests/comment";
import { usePostUtilsContext } from "@/components/Provider";
import status from "http-status";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type Tab = {
    id: number;
    name: string;
    language: string;
    value: string;
};

type CommentProps = {
    post: any;
    comment: any;
    commentCount: number;
    showFullScreen: boolean;
    setShowFullScreen: (prev: (prev: boolean) => boolean) => void;
    setShowComments: Function;
    setCommentCount: Function;
};

export default function Comment({
    post,
    comment,
    commentCount,
    showFullScreen,
    setShowFullScreen,
    setShowComments,
    setCommentCount
}: CommentProps) {
    const [tabs, setTabs] = useState<Array<Tab>>(comment?.tabs);
    const [activeTab, setActiveTab] = useState<Tab>(tabs && tabs[0]);
    const [diffActiveTab, setDiffActiveTab] = useState<Tab>(
        post.tabs && post.tabs[0]
    );
    const [showDiff, setShowDiff] = useState(false);
    const reaction = useCommentReact(post?._id, comment?._id);
    const router = useRouter();

    const { mutatePost } = usePostUtilsContext();

    useEffect(() => {
        setTabs(comment?.tabs);
        setActiveTab(comment?.tabs[0]);
    }, [comment]);

    useEffect(() => {
        const diffTab: Tab = post.tabs.filter(
            (tab: Tab) => tab.name == activeTab?.name
        )[0];
        setDiffActiveTab(diffTab);
    }, [activeTab, post.tabs]);

    async function handleUpvote() {
        try {
            await addOrRemoveCommentReact(post?._id, comment._id, "upvote");
        } catch (e) {
            toast.error("Unauthorized");
            if (e == status[status.UNAUTHORIZED]) router.push("/auth/signin");
        }
        await mutate(`/api/post/${post?._id}/comment?page=${commentCount - 1}`);
        await mutate(
            `/api/post/${post?._id}/comment/${comment._id}/react/check`
        );
    }

    async function handleDownvote() {
        try {
            await addOrRemoveCommentReact(post?._id, comment._id, "downvote");
        } catch (e) {
            toast.error("Unauthorized");
            if (e == status[status.UNAUTHORIZED]) router.push("/auth/signin");
        }
        await mutate(`/api/post/${post?._id}/comment?page=${commentCount - 1}`);
        await mutate(
            `/api/post/${post?._id}/comment/${comment._id}/react/check`
        );
    }

    async function handleDelete() {
        const loadingToast = toast.loading("Deleting...");
        try {
            await destroyComment(post._id, comment._id);
        } catch (e) {
            if (e == status[status.UNAUTHORIZED]) router.push("/auth/signin");
        }
        await mutatePost();
        if (post.commentCounts > 1) {
            await mutate(`/api/post/${post._id}/comment?page=0`);
        }
        toast.dismiss(loadingToast);
        toast.success("Deleted");
        setShowComments(false);
        setCommentCount(0);
    }

    return (
        <div className="flex overflow-hidden">
            <CodeEditorSidebar
                readonly={true}
                post={post}
                comment={comment}
                setShowFullScreen={setShowFullScreen}
                showFullScreen={showFullScreen}
                type={"comment"}
                showDiff={showDiff}
                setShowDiff={setShowDiff}
                reaction={reaction}
                handleUpvote={handleUpvote}
                handleDownvote={handleDownvote}
                handleDelete={handleDelete}
            />
            <div className="flex-1">
                <CodeEditorTabs
                    tabs={tabs}
                    setTabs={setTabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    readOnly={true}
                    showFullScreen={showFullScreen}
                />
                {showDiff ? (
                    <DiffViewer
                        activeTab={activeTab}
                        diffActiveTab={diffActiveTab}
                        showFullScreen={showFullScreen}
                    />
                ) : (
                    <CodeViewer
                        activeTab={activeTab}
                        showFullScreen={showFullScreen}
                    />
                )}
            </div>
        </div>
    );
}
