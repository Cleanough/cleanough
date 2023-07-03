"use client";
import { THEME_VALUES } from "../../constants";

import { useAppSelector } from "@/lib/hooks/redux";

export default function useTheme() {
    const themeName = useAppSelector((state) => state.theme.value);
    const theme = THEME_VALUES[themeName];
    const tabClasses = `${theme["tab.foreground"]}`;
    const tabActiveClasses = `${theme["tab.activeBackground"]}`;
    const tabInactiveClasses = `${theme["tab.inactiveBackground"]}`;
    const tabIconClasses = `${theme["tab.iconHovered"]}`;
    const sidebarClasses = `${theme["sidebar.background"]} ${theme["sidebar.foreground"]}`;
    const statusbarClasses = `${theme["statusbar.background"]} ${theme["statusbar.foreground"]}`;
    return {
        themeName,
        tabClasses,
        tabActiveClasses,
        tabInactiveClasses,
        tabIconClasses,
        sidebarClasses,
        statusbarClasses
    };
}
