import { deleteUser } from "@/server/db/queries/user";
import { deletePostsByUserId } from "@/server/db/queries/post";
import { deleteBookmarksByUserId } from "@/server/db/queries/bookmark";
import { deletePostReactsByUserId } from "@/server/db/queries/postReact";
import { deleteCommentsByUserId } from "@/server/db/queries/comment";
import { deleteCommentReactsByUserId } from "@/server/db/queries/commentReact";
import {deleteFollowingsByUserId} from "@/server/db/queries/following";

export async function deleteUserService(userId: string) {
    const user = await deleteUser(userId);

    if (!user) return 0;

    await deletePostsByUserId(userId);
    await deleteCommentsByUserId(userId);
    await deleteBookmarksByUserId(userId);
    await deletePostReactsByUserId(userId);
    await deleteCommentReactsByUserId(userId);
    await deleteFollowingsByUserId(userId);

    return user;
}
