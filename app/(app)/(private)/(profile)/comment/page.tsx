import { Posts } from "@/components/Posts";

export default async function page() {
    return (
        <div className="flex justify-center items-center flex-col gap-y-4 my-4">
            <Posts type={"comment"} />
        </div>
    );
}
