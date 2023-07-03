import { Nav } from "@/components/Layouts/App";

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Nav />
            <div>{children}</div>
        </>
    );
}
