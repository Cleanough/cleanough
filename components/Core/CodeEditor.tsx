"use client";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { createStdioLogger } from "mongodb/src/mongo_logger";
import { useCallback, useEffect, useState } from "react";
import useTheme from "@/lib/hooks/theme";
import useWindowDimensions from "@/lib/hooks/window";

type Tab = {
    id: number;
    name: string;
    language: string;
    value: string;
};

type PostEditorProps = {
    activeTab: Tab | undefined;
    setTabs: Function;
    showFullScreen: boolean;
};

export default function CodeEditor({
    activeTab,
    setTabs,
    showFullScreen
}: PostEditorProps) {
    const { themeName, tabInactiveClasses } = useTheme();
    const { width } = useWindowDimensions();
    const [value, setValue] = useState<string | undefined>(activeTab?.value);
    const options: editor.IStandaloneEditorConstructionOptions = {
        minimap: { enabled: false },
        renderLineHighlight: "all",
        readOnly: false
    };

    const handleChange = useCallback(
        (value: string | undefined) => {
            if (!activeTab) return;
            setTabs((prevValues: Array<Tab>) => {
                const updatedValues = [...prevValues];
                const index = updatedValues.findIndex(
                    (value) => value.id === activeTab.id
                );
                updatedValues[index] = {
                    ...updatedValues[index],
                    value: value ?? ""
                };
                return updatedValues;
            });
        },
        [activeTab, setTabs]
    );

    useEffect(() => {
        handleChange(value);
    }, [value, handleChange]);

    useEffect(() => {
        setValue(activeTab?.value);
    }, [activeTab?.id, activeTab?.value]);

    return (
        <div>
            {activeTab ? (
                <Editor
                    height={
                        showFullScreen
                            ? "calc(100vh - 58px)"
                            : width && width < 620
                            ? "300px"
                            : "400px"
                    }
                    value={value}
                    language={activeTab?.language?.toLowerCase()}
                    options={options}
                    theme={themeName}
                    onChange={(value) => setValue(value)}
                />
            ) : (
                <div
                    className={`${
                        showFullScreen ? "h-[92.5vh]" : "h-[300px] sm:h-[400px]"
                    } ${tabInactiveClasses}`}
                ></div>
            )}
            <span className="bg-[#ececec]"></span>
            <span className="bg-[#2e2e2e]"></span>
            <span className="bg-[#1e1e1e]"></span>
        </div>
    );
}
