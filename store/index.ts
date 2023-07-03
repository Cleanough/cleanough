"use client";
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/features/theme/themeSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {post: PostsState, comment: CommentsState, user: UsersState}
export type AppDispatch = typeof store.dispatch;
