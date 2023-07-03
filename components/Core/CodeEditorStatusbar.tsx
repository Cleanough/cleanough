"use client";
import {
    CommentIcon,
    LeftArrowIcon,
    RightArrowIcon,
    SaveIcon
} from "@/components/Icons";
import useTheme from "@/lib/hooks/theme";
import { addOrRemovePostBookmark } from "@/lib/requests/bookmark";
import { mutate } from "swr";
import { usePostBookmark } from "@/lib/hooks/bookmark";
import { useRouter } from "next/navigation";
import status from "http-status";
import { router } from "next/client";
import Link from "next/link";

type CodeEditorSidebarProps = {
    post: any;
    commentCount: number;
    setCommentCount: (prev: (prev: number) => number) => void;
    commentCounts: number;
    showComments: boolean;
    setShowComments: Function;
    setShowNewComment: Function;
    comment: any;
    setPrevComment: Function;
};

export default function CodeEditorStatusbar({
    post,
    commentCounts,
    setCommentCount,
    showComments,
    setShowComments,
    setShowNewComment,
    commentCount,
    comment,
    setPrevComment
}: CodeEditorSidebarProps) {
    const { themeName, statusbarClasses } = useTheme();
    const router = useRouter();
    const bookmark = usePostBookmark(post._id);

    async function handlePostBookmark() {
        try {
            await addOrRemovePostBookmark(post._id);
        } catch (e) {
            if (e == status[status.UNAUTHORIZED]) router.push("/auth/signin");
        }
        await mutate(`/api/post/${post._id}/bookmark/check`);
    }

    return (
        <div className={`flex justify-between border-t ${statusbarClasses}`}>
            <div className={`flex text-center`}>
                <button
                    onClick={handlePostBookmark}
                    className={`px-1.5 py-1 flex justify-center text-sm font-semibold shadow-sm`}
                >
                    <SaveIcon
                        dark={themeName == "vs-dark"}
                        filled={!!bookmark}
                    />
                </button>
                {
                    <button
                        onClick={() => {
                            if (commentCount == 0) return;
                            setCommentCount((preCount) => preCount - 1);
                        }}
                        disabled={commentCount == 0}
                        className={`px-2 py-1 flex justify-center text-sm font-semibold shadow-sm`}
                    >
                        {commentCount != 0 ? (
                            <LeftArrowIcon dark={themeName == "vs-dark"} />
                        ) : (
                            <span className="w-5"></span>
                        )}
                    </button>
                }
                <Link
                    href={`/user/${
                        showComments
                            ? comment?.user?.username
                            : post.user.username
                    }/post`}
                    className={`px-2 py-1 text-sm shadow-sm`}
                >
                    {showComments
                        ? comment?.user?.username
                        : post.user.username}
                </Link>
                <button
                    onClick={() => {
                        if (commentCount == commentCounts) return;
                        setPrevComment(comment);
                        setCommentCount((preCount) => preCount + 1);
                    }}
                    disabled={commentCount == commentCounts}
                    className={`px-2 py-1 flex justify-center text-sm font-semibold shadow-sm`}
                >
                    {commentCount != commentCounts ? (
                        <RightArrowIcon dark={themeName == "vs-dark"} />
                    ) : (
                        <span className="w-5"></span>
                    )}
                </button>
            </div>
            <div>
                <button
                    onClick={() => {
                        setShowComments(false);
                        setShowNewComment(true);
                    }}
                    className={`px-2 py-1 flex justify-center gap-x-1 text-sm font-[300] shadow-sm`}
                >
                    <span>{post.commentCounts}</span>
                    <CommentIcon dark={themeName == "vs-dark"} />
                </button>
            </div>
        </div>
    );
}
