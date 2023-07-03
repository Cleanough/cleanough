import SemiAuthenticated from "@/components/auth-checker/SemiAuthenticated";
import { userRoles } from "@/server/utils/auth";

export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <SemiAuthenticated access={[userRoles.USER, userRoles.ADMIN]}>
            {children}
        </SemiAuthenticated>
    );
}
