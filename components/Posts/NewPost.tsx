"use client";

import { useEffect, useState } from "react";
import {
    CodeEditor,
    CodeEditorSidebar,
    CodeEditorTabs
} from "@/components/Core";
import useTheme from "@/lib/hooks/theme";
import { addPost } from "@/lib/requests/post";
import status from "http-status";
import { useRouter } from "next/navigation";
import { usePostUtilsContext } from "@/components/Provider";
import { toast } from "react-hot-toast";

type Tab = {
    id: number;
    name: string;
    language: string;
    value: string;
};

export default function NewPost() {
    const { statusbarClasses } = useTheme();

    const [createNewPost, setCreateNewPost] = useState(false);
    const [tabs, setTabs] = useState<Array<Tab>>([]);
    const [activeTab, setActiveTab] = useState<Tab>();
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const router = useRouter();
    const { mutatePost } = usePostUtilsContext();

    useEffect(() => {
        if (tabs.length == 0) setIsDisabled(true);
        else setIsDisabled(false);
    }, [tabs]);

    async function handleSubmit() {
        const loadingToast = toast.loading("Creating...");
        setIsDisabled(true);
        try {
            await addPost({ tabs });
        } catch (e) {
            if (e == status[status.UNAUTHORIZED]) router.push("/auth/signin");
        }
        setTabs([]);
        setActiveTab(undefined);
        setCreateNewPost(false);
        await mutatePost();
        toast.dismiss(loadingToast);
        toast.success("Created");
        showFullScreen && setShowFullScreen(false);
    }

    return (
        <>
            {createNewPost ? (
                <div
                    className={`shadow rounded-lg overflow-hidden bg-white ${
                        showFullScreen
                            ? "fixed top-0 left-0 right-0 bottom-0 z-10 p-0"
                            : "p-4"
                    }`}
                >
                    <div
                        className={`border overflow-hidden ${
                            showFullScreen
                                ? "w-full mt-0"
                                : "w-[350px] sm:w-[550px] mt-4"
                        }`}
                    >
                        <div className="flex">
                            <CodeEditorSidebar
                                readonly={false}
                                setShowFullScreen={setShowFullScreen}
                                showFullScreen={showFullScreen}
                                type={"post"}
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
                                <CodeEditor
                                    activeTab={activeTab}
                                    setTabs={setTabs}
                                    showFullScreen={showFullScreen}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`flex justify-between border ${statusbarClasses}`}
                    >
                        <button
                            type="button"
                            disabled={isDisabled}
                            onClick={handleSubmit}
                            className={`w-full px-2 py-1 text-sm font-semibold shadow-sm ${
                                isDisabled ? "text-gray-300" : ""
                            }`}
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowFullScreen(false);
                                setCreateNewPost(false);
                                setTabs([]);
                            }}
                            className="w-full px-2 py-1 text-sm font-semibold shadow-sm"
                        >
                            Discard
                        </button>
                    </div>
                </div>
            ) : (
                <div className="shadow rounded-lg p-4 bg-white">
                    <div className="border w-[350px] sm:w-[550px]">
                        <div
                            onClick={() => setCreateNewPost(true)}
                            className={"text-center p-4 text-sm"}
                        >
                            Create New Post +
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
