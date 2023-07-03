"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SpinnerIcon } from "@/components/Icons";
import { changePassword } from "@/lib/requests/user";
import toast from "react-hot-toast";

type Inputs = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

export default function ChangePassword() {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        watch,
        formState: { errors }
    } = useForm<Inputs>();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(data: Inputs) {
        setIsLoading(true);
        try {
            await changePassword(data);
            setValue("oldPassword", "");
            setValue("newPassword", "");
            setValue("confirmNewPassword", "");
        } catch (e: any) {
            if (typeof e == "string") toast.error(e);
            setError("oldPassword", {
                type: "manual",
                message: e?.oldPassword
            });
            setError("newPassword", {
                type: "manual",
                message: e?.newPassword
            });
            setError("newPassword", {
                type: "manual",
                message: e?.newPassword
            });
        }
        setIsLoading(false);
    }

    return (
        <div className="sm:w-min mx-auto">
            <div className="w-full sm:w-[582px] rounded-lg shadow p-4 border bg-white relative">
                <h1 className="text-base font-semibold leading-7 text-gray-900">
                    Change Password
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-2 grid grid-cols-2 gap-y-2 gap-x-4"
                >
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900 required-input">
                            Old Password
                        </label>
                        <input
                            type="password"
                            {...register("oldPassword", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                }
                            })}
                            // required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                        {errors.oldPassword?.type && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.oldPassword.message}
                            </p>
                        )}
                    </div>

                    <div></div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900 required-input">
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
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900 required-input">
                            Confirm
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
                                {errors.confirmNewPassword.message}
                            </p>
                        )}
                    </div>
                    <button
                        disabled={isLoading}
                        className="w-fit inline-flex items-center mt-1 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        {isLoading ? (
                            <SpinnerIcon />
                        ) : (
                            <span>Change Password</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
