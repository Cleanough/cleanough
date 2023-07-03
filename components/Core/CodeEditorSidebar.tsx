"use client";
import {
    CodeIcon,
    DarkModeIcon,
    DeleteIcon,
    DiffActiveIcon,
    DiffExitIcon,
    FullScreenExitIcon,
    FullScreenIcon,
    LightModeIcon,
    LinkIcon,
    ThumbDownIcon,
    ThumbUpIcon
} from "@/components/Icons";
import { useAppDispatch } from "@/lib/hooks/redux";
import { switchTheme } from "@/features/theme/themeSlice";
import useTheme from "@/lib/hooks/theme";
import { useSession } from "next-auth/react";
import { MouseEventHandler } from "react";
import Link from "next/link";

type CodeEditorSidebarProps = {
    readonly: boolean;
    post?: any;
    comment?: any;
    showFullScreen: boolean;
    setShowFullScreen: (prev: (prev: boolean) => boolean) => void;
    type: string;
    reaction?: string;
    showDiff?: boolean;
    setShowDiff?: Function;
    handleUpvote?: MouseEventHandler<HTMLButtonElement>;
    handleDownvote?: MouseEventHandler<HTMLButtonElement>;
    handleDelete?: MouseEventHandler<HTMLButtonElement>;
};

export default function CodeEditorSidebar({
    readonly,
    post,
    comment,
    showFullScreen,
    setShowFullScreen,
    type,
    reaction,
    showDiff,
    setShowDiff,
    handleUpvote,
    handleDownvote,
    handleDelete
}: CodeEditorSidebarProps) {
    const dispatch = useAppDispatch();
    const { themeName, sidebarClasses } = useTheme();

    const { data: session } = useSession();

    return (
        <div
            className={`px-2 border-r flex flex-col justify-between items-center text-xs text-center ${sidebarClasses}`}
        >
            <div>
                <div className="border-b py-1">
                    <CodeIcon dark={themeName == "vs-dark"} />
                </div>
                {readonly && (
                    <div className="space-y-3 pt-3">
                        <div className="flex flex-col">
                            <button onClick={handleUpvote}>
                                <ThumbUpIcon
                                    dark={themeName == "vs-dark"}
                                    filled={reaction == "upvote"}
                                />
                            </button>
                            <span>{type == "post" && post?.upvoteCounts}</span>
                            <span>
                                {type == "comment" && comment?.upvoteCounts}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <button onClick={handleDownvote}>
                                <ThumbDownIcon
                                    dark={themeName == "vs-dark"}
                                    filled={reaction == "downvote"}
                                />
                            </button>
                            <span>
                                {type == "post" && post?.downvoteCounts}
                            </span>
                            <span>
                                {type == "comment" && comment?.downvoteCounts}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <Link href={`/post/${post._id}`}>
                                <LinkIcon dark={themeName == "vs-dark"} />
                            </Link>
                        </div>
                        {type == "post" &&
                            session?.user?.id == post?.user?._id && (
                                <div className="flex flex-col">
                                    <button onClick={handleDelete}>
                                        <DeleteIcon
                                            dark={themeName == "vs-dark"}
                                        />
                                    </button>
                                </div>
                            )}
                        {type == "comment" &&
                            session?.user?.id == comment?.user?._id && (
                                <div className="flex flex-col">
                                    <button onClick={handleDelete}>
                                        <DeleteIcon
                                            dark={themeName == "vs-dark"}
                                        />
                                    </button>
                                </div>
                            )}
                    </div>
                )}
            </div>
            <div className="space-y-3 pb-3">
                {type == "comment" && (
                    <div className="flex flex-col">
                        <button
                            onClick={() =>
                                setShowDiff &&
                                setShowDiff((pre: boolean) => !pre)
                            }
                        >
                            {showDiff ? (
                                <DiffExitIcon dark={themeName == "vs-dark"} />
                            ) : (
                                <DiffActiveIcon dark={themeName == "vs-dark"} />
                            )}
                        </button>
                    </div>
                )}
                <div className="flex flex-col">
                    <button
                        onClick={() => {
                            setShowFullScreen((prev) => !prev);
                        }}
                    >
                        {showFullScreen ? (
                            <FullScreenExitIcon dark={themeName == "vs-dark"} />
                        ) : (
                            <FullScreenIcon dark={themeName == "vs-dark"} />
                        )}
                    </button>
                </div>
                <div className="flex flex-col">
                    <button onClick={() => dispatch(switchTheme())}>
                        {themeName == "vs-dark" ? (
                            <LightModeIcon dark={themeName == "vs-dark"} />
                        ) : (
                            <DarkModeIcon dark={false} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
