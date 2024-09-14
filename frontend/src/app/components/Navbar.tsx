import Link from "next/link";

export default function Navbar() {
    return (
        <div className="noselect w-full">
            <Link href="/">
                <h1 className="logo-text text-4xl pl-6 pt-6" style={{textShadow: '#ffffff3f 1px 0px 4px', animation: 'none'}}>Guardian</h1>
            </Link>
        </div>
    );
}