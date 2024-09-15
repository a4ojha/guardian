"use client"

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="title-wrapper noselect">
        <div className="logo-container flex flex-row gap-4 items-center">
          <h1 className="logo-text text-[10rem]">Guardian</h1>
          <Image src="/logo.svg" alt="Guardian Logo" width={140} height={140} />
        </div>
        <p className="text-4xl">Real-time monitoring, real care.</p>

        <div className="buttons-container">
          <Link href="/live-feed" className="button">
            <div className="w-7 h-7 rounded-full bg-[#900000] animate-pulse"></div>
            <span className="text-3xl">Live Feed</span>
          </Link>
          <Link href="/live-feed" className="button">
            <img src="/history.svg" className="w-7 h-7" />
            <span className="text-3xl">Event Log</span>
          </Link>
          <Link href="/ai-assistant" className="button">
            <img src="/sound.svg" className="w-8 h-8" />
            <span className="text-3xl">AI Assistant</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
