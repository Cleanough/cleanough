import Guest from "@/components/auth-checker/Guest";

export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <Guest>{children}</Guest>;
}
