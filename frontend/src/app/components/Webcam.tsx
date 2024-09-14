import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client'; 

export default function WebcamStream() {
  // Define the socket state to be either `null` or a `Socket` instance
  const [socket, setSocket] = useState<Socket | null>(null);
  const [videoFrame, setVideoFrame] = useState('');

  useEffect(() => {
    // Connect to the Flask backend using Socket.IO
    const newSocket: Socket = io('http://127.0.0.1:5000');  // Flask server address
    setSocket(newSocket);

    // Request frames from the server
    newSocket.emit('request_frame');

    // Listen for video frames from the backend
    newSocket.on('video_frame', (frame: string) => {
      setVideoFrame(`data:image/jpeg;base64,${frame}`);
    });

    // Clean up on component unmount
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {videoFrame ? (
        <img src={videoFrame} alt="Webcam Feed" className="absolute top-2 left-2 bottom-2 right-2 object-cover m-auto w-[98%] h-[95%] rounded-xl" />
      ) : (
        <p>Loading webcam...</p>
      )}
    </div>
  );
}
