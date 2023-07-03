"use client";
import Link from "next/link";
import { EditIcon } from "@/components/Icons";
import React from "react";
import { usePathname } from "next/navigation";
import { User } from "@/types/next-env";

type UserProfileProps = {
    tabs: Array<any>;
    showEdit?: boolean;
    user?: User;
};

export default function UserProfile({
    tabs,
    showEdit,
    user
}: UserProfileProps) {
    return (
        <div className="w-full sm:w-min mx-auto">
            <div className="w-full sm:w-[582px] rounded-lg shadow p-4 border bg-white relative mt-16 mb-4">
                <div className="h-24 w-24 rounded-full bg-[#2e2e2e] flex justify-center items-center text-white text-3xl font-bold select-none absolute -top-12 left-1/2 -translate-x-1/2">
                    {user?.username && user?.username[0]}
                </div>
                {showEdit && (
                    <Link
                        href="/profile"
                        className="absolute right-0 top-0 bg-gray-300 p-1 pl-3 pb-3 rounded-bl-full hover:bg-gray-200"
                    >
                        <EditIcon />
                    </Link>
                )}
                <div className="text-center mt-12">
                    <div>
                        {user?.firstName} {user?.lastName}
                    </div>
                    <div>@{user?.username}</div>
                </div>
            </div>
            <Tab tabs={tabs} />
        </div>
    );
}

function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
}

function Tab({ tabs }: { tabs: Array<any> }) {
    const pathname = usePathname();

    return (
        <div className="w-full sm:w-[582px]">
            <div className="">
                <nav
                    className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
                    aria-label="Tabs"
                >
                    {tabs.map((tab, tabIdx) => (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={classNames(
                                tab.href == pathname
                                    ? "text-gray-900"
                                    : "text-gray-500 hover:text-gray-700",
                                tabIdx === 0 ? "rounded-l-lg" : "",
                                tabIdx === tabs.length - 1
                                    ? "rounded-r-lg"
                                    : "",
                                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                            )}
                        >
                            <span>{tab.name}</span>
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    tab.href == pathname
                                        ? "bg-indigo-500"
                                        : "bg-transparent",
                                    "absolute inset-x-0 bottom-0 h-0.5"
                                )}
                            />
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
