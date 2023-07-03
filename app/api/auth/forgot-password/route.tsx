import { NextResponse } from "next/server";
import { validate } from "@/server/validation/validate";
import { getRequestBody } from "@/server/utils/body";
import { forgotPasswordSchema } from "@/server/validation/schema";
import status from "http-status";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { encode } from "next-auth/jwt";
import { render } from "@react-email/render";
import transporter from "@/server/config/nodemailer";
import { CustomNextRequest } from "@/types/next-api";
import { getUserByEmail } from "@/server/db/queries/user";
import { ForgotPasswordTemplate } from "@/components/Mails";
import { use } from "@/server";
import { database } from "@/server/middlewares";

export async function POST(request: CustomNextRequest, { params }: Params) {
    const response = NextResponse;
    const { error, body } = validate(
        request,
        await getRequestBody(request),
        params,
        {
            bodySchema: forgotPasswordSchema
        }
    );

    if (error) {
        return NextResponse.json(
            { error: status[status.BAD_REQUEST] },
            {
                status: status.BAD_REQUEST,
                statusText: status[status.BAD_REQUEST]
            }
        );
    }

    const res = await use(request, response, [database]);
    if (res) return res;

    const user = await getUserByEmail(body.email);
    if (user) request.user = user;
    else return response.json({});

    const token = await encode({
        token: {
            sub: request.user.id,
            username: request.user.username,
            email: request.user.email,
            firstName: request.user.firstName,
            lastName: request.user.lastName,
            emailVerified: request.user.emailVerified,
            role: "user",
            type: "forgot_password"
        },
        secret: process.env.NEXTAUTH_SECRET!,
        maxAge: 60 * 60
    });

    const mailOptions = {
        from: '"Cleanough" <info@cleanough.com>',
        to: request.user.email,
        subject: "Forgot Password",
        html: render(<ForgotPasswordTemplate token={token} />)
    };

    await transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            return response.json(
                { error: status[status.BAD_GATEWAY] },
                {
                    status: status.BAD_GATEWAY,
                    statusText: status[status.BAD_GATEWAY]
                }
            );
        }
        return NextResponse.json({ route: "test"});
    });

}
