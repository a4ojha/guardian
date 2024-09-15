"use client"

import WebcamStream from "../components/Webcam"
import Navbar from "../components/Navbar";

export default function Page() {
    return (
        <>
            <Navbar />
            <div className="video-feed-container bg-[#0D0D0D] w-10/12 h-5/6 m-auto rounded-xl relative">
                <div className="absolute -top-10 h-12 w-fit p-5 bg-inherit rounded-lg flex gap-2 items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#900000] animate-pulse"></div>
                    <span className="">Live Feed</span>
                </div>
                <WebcamStream />
            </div>
        </>
    ); 
}