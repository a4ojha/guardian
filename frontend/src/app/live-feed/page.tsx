"use client"

import WebcamStream from "../components/Webcam"
import Navbar from "../components/Navbar";

export default function Page() {
    return (
        <>
            <Navbar />
            <div className="video-feed-container bg-[#0D0D0D] w-10/12 h-5/6 m-auto rounded-xl">
                <WebcamStream />
            </div>
        </>
    ); 
}