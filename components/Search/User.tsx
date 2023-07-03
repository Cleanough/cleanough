"use client";
import { useRouter, useSearchParams } from "next/navigation";
import SearchIcon from "@/components/Icons/Icons";
import { useState } from "react";
import { useSearchUsers } from "@/lib/hooks/user";
import Link from "next/link";

export default function SearchedUser() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [search, setSearch] = useState(searchParams.get("search") ?? "");
    const { users, isLoading, error } = useSearchUsers(
        searchParams.get("search") as string
    );

    function handleSearch() {
        if (search) router.push(`/user?search=${search}`);
        else router.push(`/user`);
    }

    return (
        <div>
            <div className="w-full sm:w-min mx-auto">
                <div className="w-full sm:w-[582px] rounded-lg shadow p-4 border bg-white relative mt-4 mb-4">
                    <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                        <div className="flex items-center gap-x-2 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                            <div className="w-full">
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <SearchIcon />
                                    </div>
                                    <input
                                        id="search"
                                        value={search}
                                        onChange={(e: any) =>
                                            setSearch(e?.target?.value)
                                        }
                                        name="search"
                                        className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        placeholder="Search User"
                                        type="search"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleSearch}
                                className="w-fit inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {users && (
                <div className="w-full sm:w-min mx-auto space-y-4">
                    {users.map((user: any) => (
                        <div
                            key={user._id}
                            className="w-full sm:w-[582px] rounded-lg shadow p-4 border bg-white relative flex items-center gap-x-2"
                        >
                            <div className="h-10 w-10 rounded-full bg-[#2e2e2e] flex justify-center items-center text-white text-3xl font-bold select-none">
                                {user.username[0]}
                            </div>
                            <Link href={`/user/${user.username}/post`}>
                                {user.username}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
            {isLoading && <div className="text-center">Loading...</div>}
            {!users?.length &&
                search &&
                searchParams.get("search") &&
                !isLoading && <div className="text-center">No User Found</div>}
        </div>
    );
}
