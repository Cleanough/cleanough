"use client";
import { DiffEditor, Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { createStdioLogger } from "mongodb/src/mongo_logger";
import { useEffect, useState } from "react";
import useTheme from "@/lib/hooks/theme";
import useWindowDimensions from "@/lib/hooks/window";

type Tab = {
    id: number;
    name: string;
    language: string;
    value: string;
};

type PostEditorProps = {
    diffActiveTab: Tab | undefined;
    activeTab: Tab | undefined;
    showFullScreen: boolean;
};

export default function CodeViewer({
    diffActiveTab,
    activeTab,
    showFullScreen
}: PostEditorProps) {
    const { themeName } = useTheme();
    const { width } = useWindowDimensions();

    const options: editor.IStandaloneEditorConstructionOptions = {
        minimap: { enabled: false },
        renderLineHighlight: "all",
        readOnly: true
    };

    return (
        <div>
            <DiffEditor
                height={
                    showFullScreen
                        ? "calc(100vh - 58px)"
                        : width && width < 620
                        ? "300px"
                        : "400px"
                }
                original={diffActiveTab?.value}
                modified={activeTab?.value}
                language={activeTab?.language}
                options={options}
                theme={themeName}
            />
        </div>
    );
}
