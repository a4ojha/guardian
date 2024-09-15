"use client";

import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client"; // or another WebSocket library
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [socket, setSocket] = useState<any>(null);

  const videos = {
    fallen: "/demo/fallen.mp4",
    calling: "/demo/calling.mp4",
    no_call: "/demo/no-call.mp4"
  }

  useEffect(() => {
    // Initialize Socket.IO connection to the backend
    const newSocket: Socket = io("http://127.0.0.1:5000"); // Your backend address here
    setSocket(newSocket);

    // Listen for a video play event from the backend
    newSocket.on("play_video", (videoId: string) => {
      setCurrentVideo(videoId);
      setIsVideoPlaying(true);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      if (newSocket) {
        newSocket.close(); // Proper cleanup
      }
    };
  }, []);

  const handleVideoEnd = () => {
    // Once the video is done, switch back to the image
    setIsVideoPlaying(false);
    setCurrentVideo(null);
  };

  return (
    <div className="ai relative w-full h-full">
      <div className="fixed top-10 right-10 !z-40">
        <Link href="/">
          <FontAwesomeIcon icon={faXmark} className="text-4xl text-gray-500 hover:text-white hover:scale-110 transition-all" />
        </Link>
      </div>

      {/* Display the video when a video is playing */}
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

      {/* TESTING, manually play video */}
      <div className="fixed top-1 left-1 flex flex-col">
        <button
          onClick={() => {
            setIsVideoPlaying(true);
            setCurrentVideo(videos.fallen); // Play fallen
            console.log(currentVideo);
          }}>
          Play 'Fallen'
        </button>

        <button
          onClick={() => {
            setIsVideoPlaying(true);
            setCurrentVideo(videos.calling); // Play calling
            console.log(currentVideo);
          }}>
          Play 'Calling'
        </button>

        <button
          onClick={() => {
            setIsVideoPlaying(true);
            setCurrentVideo(videos.no_call); // Play no-call
            console.log(currentVideo);
          }}>
          Play 'No Call'
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
