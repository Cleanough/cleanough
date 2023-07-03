import { deletePostByUserId } from "@/server/db/queries/post";
import { deletePostReacts } from "@/server/db/queries/postReact";
import {
    deleteCommentsByPostId,
    getComments
} from "@/server/db/queries/comment";
import { deleteCommentsReacts } from "@/server/db/queries/commentReact";
import { ObjectId } from "mongodb";
import { deletePostBookmarks } from "@/server/db/queries/bookmark";

export async function deletePostService(postId: string, userId: string) {
    const post = await deletePostByUserId(postId, userId);
    if (!post) {
        return 0;
    }

    await deletePostReacts(postId);
    await deletePostBookmarks(postId);

    const comments = await getComments(postId);
    const commentsId = comments.map(
        (comment: any) => new ObjectId(comment._id)
    );

    await deleteCommentsByPostId(postId);
    if (comments.length) {
        await deleteCommentsReacts(commentsId);
    }

    return post;
}
