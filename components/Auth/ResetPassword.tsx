"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SpinnerIcon } from "@/components/Icons";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { resetPassword } from "@/lib/requests/auth";
import { useResetPasswordToken } from "@/lib/hooks/auth";
import { ApplicationLogo } from "@/components/Application";

type Inputs = {
    newPassword: string;
    confirmNewPassword: string;
};

export default function ResetPassword() {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        watch,
        formState: { errors }
    } = useForm<Inputs>();
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const {
        data,
        isLoading: tokenLoading,
        error
    } = useResetPasswordToken(params.token);
    const router = useRouter();

    async function onSubmit(data: Inputs) {
        setIsLoading(true);
        try {
            await resetPassword(params.token, data);
            reset({
                newPassword: "",
                confirmNewPassword: ""
            });
            router.push("/auth/signin");
        } catch (e: any) {
            if (typeof e == "string") {
                toast.error(e);
            }
            setError("newPassword", {
                type: "manual",
                message: e?.newPassword
            });
            setError("confirmNewPassword", {
                type: "manual",
                message: e?.confirmNewPassword
            });
        }
        setIsLoading(false);
    }

    if (error) return <div>Error: {error}</div>;

    return (
        <section className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full bg-white rounded-lg shadow p-4 text-gray-600">
                <div className="text-center">
                    <div className="flex flex-shrink-0 justify-center items-center">
                        <ApplicationLogo />
                    </div>
                    <div className="mt-2 space-y-2">
                        <p className="">Reset Your Password</p>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-4 space-y-2"
                >
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            New Password
                        </label>
                        <input
                            type="password"
                            {...register("newPassword", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                },
                                minLength: {
                                    value: 8,
                                    message: "Min length is 8"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:])([^\s]){8,}$/gm,
                                    message:
                                        "Must contain uppercase letter, lowercase letter, number, and special character"
                                }
                            })}
                            // required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                        {errors.newPassword?.type && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.newPassword?.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            {...register("confirmNewPassword", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                },
                                minLength: {
                                    value: 8,
                                    message: "Min length is 8"
                                },
                                validate: {
                                    matchPassword: (value) =>
                                        value == watch("newPassword") ||
                                        "Passwords do not match"
                                }
                            })}
                            // required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                        {errors.confirmNewPassword?.type && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmNewPassword?.message}
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
                            <span>Reset Password</span>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}
