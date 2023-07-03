import { Followings } from "@/components/Followings";
import Link from "next/link";

export default function Page() {
    return (
        <div>
            <div className="w-full sm:w-[582px] mx-auto mt-6">
                <h3 className="text-2xl font-bold">Followings</h3>
                <p>
                    <Link href="/topic" className="underline">
                        Here
                    </Link>{" "}
                    is the list of all the topics
                </p>
            </div>
            <Followings />
        </div>
    );
}
