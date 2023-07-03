"use client";
import { Nav } from "@/components/Layouts/App";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const params = useSearchParams();
    return (
        <>
            <Nav />
            <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold font-mono">401</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Account not found
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        {params.get("error")}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/feed"
                            className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
