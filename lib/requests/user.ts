import { fetcher } from "@/lib/fetch";

export async function SignUp(user: {
    username: string;
    email: string;
    password: string;
}) {
    return await fetcher("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(user)
    });
}

export async function editUser(updatedUser: {
    username: string;
    firstName: string;
    lastName: string;
}) {
    return await fetcher("/api/user", {
        method: "PUT",
        body: JSON.stringify(updatedUser)
    });
}

export async function changePassword(updatedPassword: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}) {
    return await fetcher("/api/user/password", {
        method: "POST",
        body: JSON.stringify(updatedPassword)
    });
}

export async function destroyUser() {
    return await fetcher("/api/user", {
        method: "DELETE"
    });
}
