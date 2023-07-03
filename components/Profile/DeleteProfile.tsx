"use client";
import React, { useState } from "react";
import { SpinnerIcon } from "@/components/Icons";
import { destroyUser } from "@/lib/requests/user";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function DeleteProfile() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleDelete() {
        setIsLoading(true);
        const res = confirm("Are you sure to want to delete your account?");
        if (!res) {
            setIsLoading(false);
            return;
        }
        const loadingToast = toast.loading("Deleting...")
        try {
            await destroyUser();
            await signOut();
            toast.dismiss(loadingToast);
            toast.success("Deleted")
        } catch (e) {
            toast.dismiss(loadingToast);
            if (typeof e == "string")
                toast.error(e);
        }
        setIsLoading(false);
    }

    return (
        <div className="sm:w-min mx-auto">
            <div className="w-full sm:w-[582px] rounded-lg shadow p-4 border bg-white relative">
                <h1 className="text-base font-semibold leading-7 text-gray-900">
                    Delete Profile
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
                <button
                    onClick={handleDelete}
                    className="inline-flex items-center mt-2 px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    {isLoading ? <SpinnerIcon /> : <span>Delete Account</span>}
                </button>
            </div>
        </div>
    );
}
