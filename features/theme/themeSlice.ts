"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { THEME_VALUES } from "@/constants";

// Define a type for the slice state
interface ThemeName {
    value: keyof typeof THEME_VALUES;
}

const initialState: ThemeName = {
    value: "light"
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        switchTheme: (state) => {
            state.value = state.value == "light" ? "vs-dark" : "light";
        }
    }
});

export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
