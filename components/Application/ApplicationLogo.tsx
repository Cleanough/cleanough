import Image from "next/image";
import Link from "next/link";

export default function ApplicationLogo() {
    return (
        <Link href="/feed">
            <Image src="/cleanough.png" width={33} height={33} alt="C" />
        </Link>
    );
}
