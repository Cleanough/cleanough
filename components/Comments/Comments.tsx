"use client";
import { useEffect, useState } from "react";
import { NewComment, Comment } from "@/components/Comments";
import { useComments } from "@/lib/hooks/comment";
import CodeEditorStatusbar from "@/components/Core/CodeEditorStatusbar";

type CommentsProps = {
    post: any;
    showFullScreen: boolean;
    setShowFullScreen: (prev: (prev: boolean) => boolean) => void;
    commentCounts: number;
};

export default function Comments({
    post,
    showFullScreen,
    setShowFullScreen,
    commentCounts
}: CommentsProps) {
    const [showComments, setShowComments] = useState(false);
    const [showNewComment, setShowNewComment] = useState(false);
    const [commentCount, setCommentCount] = useState(0);

    const { comments, error, isLoading } = useComments(
        post._id,
        commentCount - 1
    );

    const [preComment, setPrevComment] = useState(comments && comments[0]);

    useEffect(() => {
        if (commentCount == 0) setShowComments(false);
        else setShowComments(true);
    }, [commentCount]);

    if (isLoading && showComments) {
        return (
            <>
                <div className="absolute top-0 w-full">
                    <Comment
                        post={post}
                        commentCount={commentCount}
                        comment={preComment}
                        showFullScreen={showFullScreen}
                        setShowFullScreen={setShowFullScreen}
                        setShowComments={setShowComments}
                        setCommentCount={setCommentCount}
                    />
                </div>
                <CodeEditorStatusbar
                    post={post}
                    commentCount={commentCount}
                    setCommentCount={setCommentCount}
                    commentCounts={commentCounts}
                    showComments={showComments}
                    setShowComments={setShowComments}
                    setShowNewComment={setShowNewComment}
                    comment={preComment}
                    setPrevComment={setPrevComment}
                />
            </>
        );
    }

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="absolute top-0 w-full">
                {showComments && (
                    <Comment
                        post={post}
                        commentCount={commentCount}
                        comment={comments[0]}
                        showFullScreen={showFullScreen}
                        setShowComments={setShowComments}
                        setCommentCount={setCommentCount}
                        setShowFullScreen={setShowFullScreen}
                    />
                )}
                {showNewComment && (
                    <NewComment
                        discardNewComment={() => {
                            setShowNewComment(false);
                            setShowComments(false);
                        }}
                        post={post}
                        showFullScreen={showFullScreen}
                        setShowFullScreen={setShowFullScreen}
                    />
                )}
            </div>
            <CodeEditorStatusbar
                post={post}
                commentCount={commentCount}
                setCommentCount={setCommentCount}
                commentCounts={commentCounts}
                showComments={showComments}
                setShowComments={setShowComments}
                setShowNewComment={setShowNewComment}
                comment={comments[0]}
                setPrevComment={setPrevComment}
            />
        </>
    );
}
