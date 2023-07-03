import { Posts } from "@/components/Posts";

export default function feed() {
    return (
        <div className="flex justify-center items-center flex-col gap-y-4 my-4">
            <Posts type={"feed"} />
        </div>
    );
}
