import { NextResponse } from "next/server";
import transporter from "@/server/config/nodemailer";
import { VerifyEmailTemplate } from "@/components/Mails";
import { render } from "@react-email/render";
import { encode } from "next-auth/jwt";
import status from "http-status";
import { use } from "@/server";
import {
    database,
    roleAuthorization,
    semiTokenChecker
} from "@/server/middlewares";
import { userRoles } from "@/server/utils/auth";
import { CustomNextRequest } from "@/types/next-api";

export async function POST(request: CustomNextRequest) {
    const response = NextResponse;

    const res = await use(request, response, [
        database,
        semiTokenChecker,
        roleAuthorization([userRoles.USER, userRoles.ADMIN])
    ]);
    if (res) return res;

    const token = await encode({
        token: {
            sub: request.user.id,
            username: request.user.username,
            email: request.user.email,
            firstName: request.user.firstName,
            lastName: request.user.lastName,
            emailVerified: null,
            role: "user",
            type: "email_verification"
        },
        secret: process.env.NEXTAUTH_SECRET!,
        maxAge: 24 * 60 * 60
    });

    const mailOptions = {
        from: '"Cleanough" <info@cleanough.com>',
        to: request.user.email,
        subject: "Email Verification",
        html: render(<VerifyEmailTemplate token={token} />)
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            return response.json(
                { error: status[status.BAD_GATEWAY] },
                {
                    status: status.BAD_GATEWAY,
                    statusText: status[status.BAD_GATEWAY]
                }
            );
        }
    });

    return response.json({ info: "250 2.0.0 Ok" });
}
