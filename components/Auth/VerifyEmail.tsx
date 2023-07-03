"use client";
import { useState } from "react";
import { SpinnerIcon } from "@/components/Icons";
import toast from "react-hot-toast";
import { verifyEmail } from "@/lib/requests/auth";
import { signOut, useSession } from "next-auth/react";
import { ApplicationLogo } from "@/components/Application";

export default function VerifyEmail() {
    const [isLoading, setIsLoading] = useState(false);
    const { data: session, status } = useSession();

    async function onSubmit() {
        setIsLoading(true);
        await verifyEmail();
        toast.success("Email is sent");
        setIsLoading(false);
    }

    return (
        <section className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full bg-white rounded-lg shadow p-4 text-gray-600">
                <div className="text-center">
                    <div className="flex flex-shrink-0 justify-center items-center">
                        <ApplicationLogo />
                    </div>
                    <div className="mt-2 space-y-2">
                        <p>
                            An email is sent to {session?.user.email}, kindly
                            verify your email address.
                        </p>
                    </div>
                </div>
                <button
                    onClick={onSubmit}
                    disabled={isLoading}
                    className="w-full inline-flex justify-center items-center mt-1 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-sm text-white tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    {isLoading ? <SpinnerIcon /> : <span>Resend</span>}
                </button>
                <button
                    onClick={() => signOut()}
                    className="w-full flex items-center justify-center gap-x-3 py-2 mt-2 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
                >
                    <span>Logout</span>
                </button>
            </div>
        </section>
    );
}
