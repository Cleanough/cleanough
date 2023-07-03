"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ApplicationLogo } from "@/components/Application";

const NAV_ITEMS: Array<any> = [
    // { name: "Home", href: "/feed" },
    // { name: "Dashboard", href: "/dashboard" },
    // { name: "Team", href: "/team" },
    // { name: "Projects", href: "/projects" },
];

export default function Nav() {
    const { data: session, status, update } = useSession();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const closeDropdown = () => {
        setShowDropdown(false);
    };

    const dropdownRef = useRef(null);

    const pathname = usePathname();
    return (
        <nav className="bg-white shadow">
            <div className="mx-auto container px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 justify-between">
                    <div className="flex flex-1 items-stretch justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <ApplicationLogo />
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium 
                                        ${
                                            pathname === item.href
                                                ? "text-gray-900 border-b-2 border-primary"
                                                : "text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
                                        }
                                            `}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <span className="bg-[#2e2e2e]"></span>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/*<Link*/}
                        {/*    href="/notifications"*/}
                        {/*    className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"*/}
                        {/*>*/}
                        {/*    <span className="sr-only">View notifications</span>*/}
                        {/*    <NotificationIcon />*/}
                        {/*</Link>*/}

                        {status === "authenticated" ? (
                            <div className="relative ml-3">
                                <div>
                                    <button
                                        type="button"
                                        className="flex rounded-full bg-white text-sm border-2 focus:ring-2"
                                        onClick={() =>
                                            setShowDropdown(!showDropdown)
                                        }
                                    >
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <div className="h-10 w-10 rounded-full bg-[#2e2e2e] flex justify-center items-center text-white text-2xl font-bold select-none">
                                            {session.user.username[0]}
                                        </div>
                                    </button>
                                </div>

                                {showDropdown && (
                                    <div
                                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        ref={dropdownRef}
                                    >
                                        <Link
                                            onClick={() =>
                                                setShowDropdown(false)
                                            }
                                            href="/post"
                                            className="block px-4 py-2 text-sm text-gray-700 overflow-hidden border-b mr-4"
                                        >
                                            {session?.user?.username}
                                        </Link>
                                        <Link
                                            onClick={() =>
                                                setShowDropdown(false)
                                            }
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            onClick={() =>
                                                setShowDropdown(false)
                                            }
                                            href="/user"
                                            className="block px-4 py-2 text-sm text-gray-700"
                                        >
                                            Users
                                        </Link>
                                        <Link
                                            onClick={() =>
                                                setShowDropdown(false)
                                            }
                                            href="/following"
                                            className="block px-4 py-2 text-sm text-gray-700"
                                        >
                                            Following
                                        </Link>
                                        <button
                                            onClick={async () => {
                                                setShowDropdown(false);
                                                await signOut();
                                            }}
                                            className="block px-4 py-2 text-sm text-gray-700"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="items-center justify-center gap-x-3 flex">
                                <Link
                                    href={"/auth/signin"}
                                    className="hidden sm:flex items-center justify-center gap-x-2 py-2 px-4 bg-gray-100 text-sm duration-150 hover:bg-gray-200 active:bg-gray-200 rounded-lg md:inline-flex"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href={"/auth/signup"}
                                    className="flex items-center justify-center gap-x-2 py-2 px-4 text-white text-sm bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg md:inline-flex"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showMobileMenu && (
                <div
                    className="sm:hidden absolute bg-white left-0 right-0 border-b-2"
                    id="mobile-menu"
                >
                    <div className="space-y-1 pb-4 pt-2">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium
                                        ${
                                            pathname === item.href
                                                ? "border-primary bg-gray-200 text-primary"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                        }
                                            `}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
