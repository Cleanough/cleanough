"use client";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="container flex justify-center mt-24 xl:mt-48">
            <div className="space-y-5 mx-auto xl:mx-0 text-center">
                <div className="flex flex-wrap items-center justify-center gap-6 xl:justify-start">
                    <span className="flex items-center gap-x-2 text-gray-500 text-sm mx-auto">
                        Linus Torvalds
                    </span>
                </div>
                <h1 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl xl:text-6xl">
                    Talk is cheap...
                    <br /> Show me the code;
                </h1>
                <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                    <Link
                        href="/auth/signup"
                        className="flex items-center justify-center gap-x-2 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg md:inline-flex"
                    >
                        Get Started
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                    <Link
                        href="/feed"
                        className="flex items-center justify-center gap-x-2 py-2 px-4 font-medium border duration-150 hover:bg-gray-100 active:bg-gray-100 rounded-lg md:inline-flex"
                    >
                        Try it
                    </Link>
                </div>
            </div>
        </section>
    );
}
