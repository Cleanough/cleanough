"use client";
import { Editor } from "@monaco-editor/react";
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
    activeTab: Tab | undefined;
    showFullScreen: boolean;
};

export default function CodeViewer({
    activeTab,
    showFullScreen
}: PostEditorProps) {
    const [height, setHeight] = useState(400);
    const { themeName } = useTheme();
    const { width } = useWindowDimensions();
    const options: editor.IStandaloneEditorConstructionOptions = {
        minimap: { enabled: false },
        renderLineHighlight: "all",
        readOnly: true
    };

    return (
        <div>
            <Editor
                height={
                    showFullScreen
                        ? "calc(100vh - 58px)"
                        : width && width < 620
                        ? "300px"
                        : "400px"
                }
                value={activeTab?.value}
                language={activeTab?.language?.toLowerCase()}
                options={options}
                theme={themeName}
            />
        </div>
    );
}
