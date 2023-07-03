import { Posts } from "@/components/Posts";
import UserProfile from "@/components/Profile/UserProfile";

export default async function page({
    params
}: {
    params: { username: string };
}) {
    return (
        <>
            <div className="flex justify-center items-center flex-col gap-y-4 my-4">
                <Posts
                    type={`user/${params.username}/post`}
                    username={params.username}
                />
            </div>
        </>
    );
}
