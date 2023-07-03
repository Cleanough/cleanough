import { ShowPost } from "@/components/Posts";

export default function page({ params }: { params: { postId: string } }) {
    return (
        <div className="flex justify-center items-center flex-col gap-y-4 my-4">
            <ShowPost postId={params.postId} />
        </div>
    );
}
