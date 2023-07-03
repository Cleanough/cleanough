import { deleteCommentByUserId } from "@/server/db/queries/comment";
import { deleteCommentReacts } from "@/server/db/queries/commentReact";

export async function deleteCommentService(commentId: string, userId: string) {
    const comment = await deleteCommentByUserId(commentId, userId);
    if (comment.deletedCount) {
        await deleteCommentReacts(commentId);
    }
    return comment.deletedCount;
}
