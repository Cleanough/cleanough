"use client";
import { useEffect, useState } from "react";
import {
    CodeEditor,
    CodeEditorSidebar,
    CodeEditorTabs,
    CodeViewer,
    DiffViewer
} from "@/components/Core";
import useTheme from "@/lib/hooks/theme";
import { addComment } from "@/lib/requests/comment";
import { mutate } from "swr";
import { usePostUtilsContext } from "@/components/Provider";
import status from "http-status";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

type Tab = {
    id: number;
    name: string;
    language: string;
    value: string;
};

type NewCommentProps = {
    discardNewComment: () => void;
    post: any;
    showFullScreen: boolean;
    setShowFullScreen: (prev: (prev: boolean) => boolean) => void;
};

export default function NewComment({
    discardNewComment,
    post,
    showFullScreen,
    setShowFullScreen
}: NewCommentProps) {
    const { statusbarClasses } = useTheme();
    const [tabs, setTabs] = useState<Array<Tab>>(post.tabs);
    const [activeTab, setActiveTab] = useState<Tab>(post.tabs[0]);
    const [diffActiveTab, setDiffActiveTab] = useState<Tab>(
        post.tabs && post.tabs[0]
    );
    const [showDiff, setShowDiff] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const { mutatePost } = usePostUtilsContext();

    useEffect(() => {
        if (tabs.length == 0) setIsDisabled(true);
        else setIsDisabled(false);
    }, [tabs]);

    useEffect(() => {
        const diffTab: Tab = post.tabs.filter(
            (tab: Tab) => tab.name == activeTab?.name
        )[0];
        setDiffActiveTab(diffTab);
    }, [activeTab, post.tabs]);

    useEffect(() => {
        showDiff &&
            setActiveTab(
                tabs.filter((tab: Tab) => tab.name == activeTab.name)[0]
            );
    }, [showDiff, tabs, activeTab.name]);

    async function handleSubmit() {
        const loadingToast = toast.loading("Creating...");
        setIsDisabled(true);
        try {
            await addComment(post._id, { tabs });
        } catch (e) {
            if (e == status[status.UNAUTHORIZED]) redirect("/auth/signin");
        }
        await mutate(`/api/post/${post._id}/comment?page=0`);
        await mutatePost();
        toast.dismiss(loadingToast);
        toast.success("Created");
        setTabs([]);
        discardNewComment();
    }

    return (
        <div className="">
            <div className="w-full">
                <div className="flex overflow-hidden">
                    <CodeEditorSidebar
                        readonly={false}
                        setShowFullScreen={setShowFullScreen}
                        showFullScreen={showFullScreen}
                        showDiff={showDiff}
                        setShowDiff={setShowDiff}
                        type={"comment"}
                    />
                    <div className="flex-1">
                        <CodeEditorTabs
                            tabs={tabs}
                            setTabs={setTabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            readOnly={false}
                            showFullScreen={showFullScreen}
                        />
                        {showDiff ? (
                            <DiffViewer
                                activeTab={activeTab}
                                diffActiveTab={diffActiveTab}
                                showFullScreen={showFullScreen}
                            />
                        ) : (
                            <CodeEditor
                                activeTab={activeTab}
                                setTabs={setTabs}
                                showFullScreen={showFullScreen}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div
                className={`flex justify-between w-full border-t text-center ${statusbarClasses}`}
            >
                <button
                    type="button"
                    disabled={isDisabled}
                    onClick={handleSubmit}
                    className={`w-full px-2 py-1 flex justify-center text-sm font-semibold shadow-sm ${
                        isDisabled ? "text-gray-300" : ""
                    }`}
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => {
                        discardNewComment();
                        setTabs([]);
                    }}
                    className="w-full px-2 py-1 flex justify-center text-sm font-semibold shadow-sm"
                >
                    Discard
                </button>
            </div>
        </div>
    );
}
