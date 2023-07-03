"use client";
import { destroyFollowing } from "@/lib/requests/following";
import { mutate } from "swr";

export default function Following({
    language
}: {
    language: {
        topic: string;
    };
}) {
    async function handleFollowing() {
        await destroyFollowing(language.topic);
        await mutate("/api/following");
    }
    return (
        <div className="w-full sm:w-[582px] rounded-lg shadow p-4 border">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-[500]">{language.topic}</p>
                    {/*<p>{language.extensions.map(ext => (*/}
                    {/*    <span className="text-sm" key={ext}>{ext} {"  "}</span>*/}
                    {/*))}</p>*/}
                </div>
                <div>
                    <button
                        type="button"
                        onClick={async () => await handleFollowing()}
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Following
                    </button>
                </div>
            </div>
        </div>
    );
}
