import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            id: string;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
            emailVerified: Date | null;
            role: string;
        } & DefaultSession["user"];
    }
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User {
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        emailVerified: Date;
        role: string;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        sub: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        emailVerified: Date | null;
        type?: string;
    }
}
