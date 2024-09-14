"use client"

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="title-wrapper noselect">
        <div className="logo-container flex flex-row gap-4 items-center">
          <h1 className="logo-text text-9xl">Guardian</h1>
          <Image src="/logo.svg" alt="Guardian Logo" width={120} height={120} />
        </div>
        <p className="text-2xl">Real-time monitoring, real care.</p>

        <div className="buttons-container">
          <Link href="/live-feed" className="button">
            <div className="w-5 h-5 rounded-full bg-[#900000] animate-pulse"></div>
            <span className="text-xl">Live Feed</span>
          </Link>
          <Link href="/live-feed" className="button">
            <img src="/history.svg" alt="Temperature" className="w-6 h-6" />
            <span className="text-xl">Event Log</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
