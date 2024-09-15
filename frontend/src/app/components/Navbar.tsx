import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <div className="noselect w-full flex flex-row justify-between ">
            <Link href="/" className="flex gap-2 items-center w-fit ml-6 mt-6">
                <h1 className="logo-text text-4xl" style={{textShadow: '#ffffff3f 1px 0px 4px', animation: 'none'}}>Guardian</h1>
                <Image src="/logo.svg" alt="Guardian Logo" width={40} height={40} />
            </Link>

            {/* <div className="w-20 patient-select mt-6 flex flex-row gap-3 items-center justify-center">
                <span>John Doe</span>
                <Image src="/chevron-down.svg" alt="down arrow" width={20} height={20} />
            </div> */}

            <Link href="/profile">
                <Image src="/profile.svg" alt="profile logo" width={100} height={100} className="mr-6 mt-6"></Image>
            </Link>
        </div>
    );
}