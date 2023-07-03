"use client";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SpinnerIcon } from "@/components/Icons";
import { forgotPassword } from "@/lib/requests/auth";
import { ApplicationLogo } from "@/components/Application";
import { toast } from "react-hot-toast";

type Inputs = {
    email: string;
};

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>();
    const [isLoading, setIsLoading] = useState(false);
    const [sentStatus, setSentStatus] = useState(false);

    async function onSubmit(data: Inputs) {
        setIsLoading(true);
        await forgotPassword(data.email);
        toast.success("Email is sent");
        setSentStatus(true);
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
                        {sentStatus ? (
                            <div>Check your email to reset your password</div>
                        ) : (
                            <p className="">
                                Enter the email associated with your account to
                                change your password.
                            </p>
                        )}
                    </div>
                </div>
                {!sentStatus && (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-4 space-y-2"
                    >
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "This field is required"
                                    }
                                })}
                                // required
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                            {errors.email?.type && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <button
                            disabled={isLoading}
                            className="w-full inline-flex justify-center items-center mt-1 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-sm text-white tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            {isLoading ? (
                                <SpinnerIcon />
                            ) : (
                                <span>Send Email</span>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
