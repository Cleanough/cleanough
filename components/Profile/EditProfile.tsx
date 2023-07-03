"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "@/lib/hooks/user";
import { SpinnerIcon } from "@/components/Icons";
import { editUser } from "@/lib/requests/user";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

type Inputs = {
    firstName: string;
    lastName: string;
    username: string;
};

export default function EditProfile() {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        watch,
        formState: { errors }
    } = useForm<Inputs>();
    const [isLoading, setIsLoading] = useState(false);
    const { data: session, update } = useSession();

    useEffect(() => {
        setValue("firstName", session?.user?.firstName ?? "");
        setValue("lastName", session?.user?.lastName ?? "");
        setValue("username", session?.user?.username ?? "");
    }, [session?.user, setValue]);

    async function onSubmit(data: Inputs) {
        setIsLoading(true);
        try {
            await editUser(data);
            await update({
                user: {
                    ...session?.user,
                    username: data.username,
                    firstName: data.firstName,
                    lastName: data.lastName
                }
            });
        } catch (e: any) {
            if (typeof e == "string") toast.error(e);
            setError("username", {
                type: "manual",
                message: e?.username
            });
        }
        setIsLoading(false);
    }

    return (
        <div className="sm:w-min mx-auto">
            <div className="w-full sm:w-[582px] rounded-lg shadow p-4 border bg-white relative">
                <h1 className="text-base font-semibold leading-7 text-gray-900">
                    Edit Profile
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2"
                >
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            First Name
                        </label>
                        <input
                            type="text"
                            {...register("firstName")}
                            // required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                        {errors.firstName?.type && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Last Name
                        </label>
                        <input
                            type="text"
                            {...register("lastName")}
                            // required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                        {errors.lastName?.type && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900 required-input">
                            Username
                        </label>
                        <input
                            type="text"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                }
                            })}
                            // required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                        {errors.username?.type && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900 required-input">
                            Email
                        </label>
                        <span
                            // required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        >
                            {session?.user?.email}
                        </span>
                    </div>

                    <button
                        disabled={isLoading}
                        className="w-fit inline-flex items-center mt-1 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        {isLoading ? (
                            <SpinnerIcon />
                        ) : (
                            <span>Change Profile</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
