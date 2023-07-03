import { Topics } from "@/components/Topics";

export default function Page() {
    return (
        <div>
            <div className="w-full sm:w-[582px] mx-auto mt-6">
                <h3 className="text-2xl font-bold">Topics</h3>
            </div>
            <Topics />
        </div>
    );
}
