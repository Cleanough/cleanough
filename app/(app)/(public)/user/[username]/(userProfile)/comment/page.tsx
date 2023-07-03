import { Posts } from "@/components/Posts";

export default async function page({
    params
}: {
    params: { username: string };
}) {
    return (
        <div className="flex justify-center items-center flex-col gap-y-4 my-4">
            <Posts
                type={`user/${params.username}/comment`}
                username={params.username}
            />
        </div>
    );
}
