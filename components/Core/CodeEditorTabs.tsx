"use client";
import { useEffect, useState } from "react";
import useTheme from "@/lib/hooks/theme";
import { Languages } from "../../constants";

type Tab = {
    id: number;
    name: string;
    language: string;
    value: string;
};

type PostEditorTabsProps = {
    tabs: Array<Tab>;
    setTabs: (prevTabs: (prevTabs: Array<Tab>) => Tab[]) => void;
    activeTab: Tab | undefined;
    setActiveTab: Function;
    readOnly: boolean;
    showFullScreen: boolean;
};
export default function CodeEditorTabs({
    tabs,
    setTabs,
    activeTab,
    setActiveTab,
    readOnly,
    showFullScreen
}: PostEditorTabsProps) {
    const [showNewFileName, setShowNewFileName] = useState(false);
    const [newFileName, setNewFileName] = useState("");
    const [hoveredTab, setHoveredTab] = useState<null | number>(null);
    const [tabCount, setTabCount] = useState<number>(0);
    const [fileNames, setFileNames] = useState<Array<string>>([]);
    const { tabClasses, tabActiveClasses, tabInactiveClasses, tabIconClasses } =
        useTheme();

    useEffect(() => {
        if (tabs.length) setTabCount(tabs[tabs.length - 1].id + 1);
    }, [tabs]);

    useEffect(() => {
        const names = tabs.map((tab) => tab.name);
        setFileNames(names);
    }, [tabs]);

    useEffect(() => {
        if (!tabs?.length) setShowNewFileName(true);
        else setShowNewFileName(false);
    }, [tabs]);

    function getExtension(name: string): string {
        const re = /(?:\.([^.]+))?$/;
        const result = re.exec(name);
        return result ? "." + result[1] : "";
    }

    function getLanguageName(name: string) {
        const extension = getExtension(name);
        return Languages.filter((language) =>
            language.extensions.includes(getExtension(name))
        )[0]?.name;
    }

    function createNewFile() {
        if (!newFileName) {
            setShowNewFileName(false);
            return;
        }
        if (fileNames.includes(newFileName)) {
            alert("Duplicate File Exists");
            return;
        }
        setTabCount((pre) => pre + 1);
        const newTab = {
            id: tabCount,
            name: newFileName,
            language: getLanguageName(newFileName),
            value: ""
        };
        setTabs(() => [...tabs, newTab]);
        setNewFileName("");
        setActiveTab(newTab);
        setShowNewFileName(false);
    }

    function deleteFile(id: number) {
        setTabs((prevTabs: Array<Tab>) =>
            prevTabs.filter((tab) => tab.id !== id)
        );

        if (activeTab?.id === id) {
            const index = tabs.findIndex((tab) => tab.id === id);
            const newActiveTab =
                tabs[index - 1] || tabs[index + 1] || undefined;
            setActiveTab(newActiveTab);
        }
    }

    return (
        <div
            className={`flex overflow-x-auto ${
                showFullScreen ? "w-full" : "w-[392px] sm:w-[516px]"
            } ${tabInactiveClasses}`}
        >
            {tabs &&
                tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-1 py-1 inline-flex items-center ${tabClasses} text-sm ${
                            tab.id == activeTab?.id
                                ? tabActiveClasses
                                : tabInactiveClasses
                        }`}
                        onClick={() => setActiveTab(tab)}
                        onMouseEnter={() => setHoveredTab(tab.id)}
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        <span className="px-1">{tab.name}</span>
                        {(tab.id == activeTab?.id || tab.id == hoveredTab) &&
                        !readOnly ? (
                            <span
                                onClick={(event) => {
                                    event.stopPropagation();
                                    deleteFile(tab.id);
                                }}
                                className={`px-1 h-5 w-5 font-[300] rounded inline-flex items-center justify-center ${tabIconClasses}`}
                            >
                                x
                            </span>
                        ) : (
                            <span className="px-1 h-5 w-5 inline-flex items-center justify-center"></span>
                        )}
                    </button>
                ))}
            {!readOnly &&
                (showNewFileName ? (
                    <input
                        autoFocus={true}
                        type={"text"}
                        value={newFileName}
                        onChange={(e) => {
                            setNewFileName(e.target.value);
                        }}
                        className={`px-1 py-1 text-sm ${tabClasses} ${tabActiveClasses}`}
                        onBlur={createNewFile}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") createNewFile();
                        }}
                    />
                ) : (
                    <button
                        className={`px-1 py-1 inline-flex items-center ${tabClasses} text-sm ${tabInactiveClasses}`}
                        onClick={() => {
                            setShowNewFileName(true);
                        }}
                    >
                        <span
                            className={`px-1 h-5 w-5 font-[200] rounded inline-flex items-center justify-center text-lg ${tabIconClasses}`}
                        >
                            +
                        </span>
                    </button>
                ))}
        </div>
    );
}
