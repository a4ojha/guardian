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
    <div>
      <h1>Live Webcam Stream</h1>
      {videoFrame ? (
        <img src={videoFrame} alt="Webcam Feed" />
      ) : (
        <p>Loading webcam...</p>
      )}
    </div>
  );
}
