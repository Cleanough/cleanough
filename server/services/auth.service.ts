import {
    getUserByEmail,
    getUserByUsername,
    registerUser
} from "@/server/db/queries/user";
import status from "http-status";

export async function registerUserService(
    username: string,
    email: string,
    password?: string
) {
    let errors = {
        username: "",
        email: "",
        confirmPassword: ""
    };

    let usernameExists = await getUserByUsername(username);

    if (usernameExists) {
        errors.username = "Username already exists";
    }

    let emailExists = await getUserByEmail(email);

    if (emailExists) {
        errors.email = "Email already exists";
    }

    if (errors.email || errors.username) {
        return [
            { error: { username: errors.username, email: errors.email } },
            {
                status: status.BAD_REQUEST,
                statusText: status[status.BAD_REQUEST]
            }
        ];
    }

    const use = [
        { error: { username: errors.username, email: errors.email } },
        {
            status: status.BAD_REQUEST,
            statusText: status[status.BAD_REQUEST]
        }
    ];
    use[0].error;
    const user = await registerUser({
        username,
        email,
        password,
        role: "user"
    });

    return [
        { user },
        {
            status: status.OK,
            statusText: status[status.OK]
        }
    ];
}
