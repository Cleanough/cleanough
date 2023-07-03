"use client";
import React, { createContext, useContext } from "react";
import { KeyedMutator } from "swr";

const AppContext = createContext(null as any);

type PostTypeProviderProps = {
    children: React.ReactNode;
    type: string;
    mutatePost: KeyedMutator<any[]>;
};
export function PostUtilsProvider({
    children,
    type,
    mutatePost
}: PostTypeProviderProps) {
    return (
        <AppContext.Provider value={{ type, mutatePost }}>
            {children}
        </AppContext.Provider>
    );
}
export function usePostUtilsContext() {
    return useContext(AppContext);
}
