import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <div className="noselect w-full">
            <Link href="/" className="flex gap-2 items-center w-fit ml-6 mt-6">
                <h1 className="logo-text text-4xl" style={{textShadow: '#ffffff3f 1px 0px 4px', animation: 'none'}}>Guardian</h1>
                <Image src="/logo.svg" alt="Guardian Logo" width={40} height={40} />
            </Link>
        </div>
    );
}