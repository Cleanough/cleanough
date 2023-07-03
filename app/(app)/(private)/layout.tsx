import Authenticated from "@/components/auth-checker/Authenticated";

export default function PrivateLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <Authenticated access={["user", "admin"]}>
            <div>{children}</div>
        </Authenticated>
    );
}
