"use client";

import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faVolumeLow } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const videos = {
    fallen: "/demo/fallen.mp4",
    calling: "/demo/calling.mp4",
    no_call: "/demo/no-call.mp4"
  };

  useEffect(() => {
    // Initialize Socket.IO connection to the backend
    const newSocket: Socket = io("http://127.0.0.1:5000");

    // Listen for a video play event from the backend
    newSocket.on("play_video", (videoId: string) => {
      setCurrentVideo(videoId);
      setIsVideoPlaying(true);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.close(); // Proper cleanup
    };
  }, []);

  const handleVideoEnd = () => {
    // Once the video is done, switch back to the image
    setIsVideoPlaying(false);
    setCurrentVideo(null);
  };

  return (
    <div className="ai-page relative w-full h-full">
      <div className="fixed top-10 right-10 !z-40">
        <Link href="/">
          <FontAwesomeIcon icon={faXmark} className="text-4xl text-gray-500 hover:text-white hover:scale-110 transition-all" />
        </Link>
      </div>

      {isVideoPlaying && currentVideo && (
        <video
          key={currentVideo}
          className="absolute top-0 left-0 w-full h-full object-cover !z-10"
          controls={false}
          autoPlay
          onEnded={handleVideoEnd}
        >
          <source src={currentVideo} type="video/mp4" />
        </video>
      )}

      <div className="fixed top-10 left-10 flex flex-col items-start !z-50" id="test-buttons">
        <button
          onClick={() => {
            setIsVideoPlaying(true);
            setCurrentVideo(videos.fallen);
          }}
          className="hover:opacity-50 transition flex flex-row items-center "
        >
          v1
          <FontAwesomeIcon icon={faVolumeLow} className="ml-2 text-xs mb-[3px] text-[#b3b3b3]" />
        </button>
        <button
          onClick={() => {
            setIsVideoPlaying(true);
            setCurrentVideo(videos.calling);
          }}
          className="hover:opacity-50 transition flex flex-row items-center "
        >
          v2
          <FontAwesomeIcon icon={faVolumeLow} className="ml-2 text-xs mb-[3px] text-[#b3b3b3]" />
        </button>
        <button
          onClick={() => {
            setIsVideoPlaying(true);
            setCurrentVideo(videos.no_call);
          }}
          className="hover:opacity-50 transition flex flex-row items-center "
        >
          v3
          <FontAwesomeIcon icon={faVolumeLow} className="ml-2 text-xs mb-[3px] text-[#b3b3b3]" />
        </button>
      </div>

      <div className="blob-cont fixed left-[48%] top-1/3 transform -translate-x-1/2 -translate-y-1/2 !z-50">
        <div className="yellow blob"></div>
        <div className="red blob"></div>
        <div className="green blob"></div>
      </div>
    </div>
  );
}
