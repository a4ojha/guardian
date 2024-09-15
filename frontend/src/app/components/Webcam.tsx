import { useEffect, useState } from 'react';
import io from 'socket.io-client'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function WebcamStream() {
  const [videoFrame, setVideoFrame] = useState('');

  useEffect(() => {
    // Connect to the Flask backend using Socket.IO
    const newSocket = io('wss://infinite-remotely-calf.ngrok-free.app/', {
      transports: ['websocket']
    });

    // Request frames from the server
    newSocket.emit('subscribe_camera', {"dbid": '66e5ddbc7c757f3c10cac13a'});

    // Listen for video frames from the backend
    newSocket.on('receive_frame', (frame) => {
      setVideoFrame(`data:image/jpeg;base64,${frame.frame}`);
    });

    // Clean up on component unmount
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {videoFrame ? (
        <Image
          src={videoFrame}
          alt="Webcam Feed"
          width={800} 
          height={600} 
          className="absolute top-2 left-2 bottom-2 right-2 object-cover m-auto w-[98%] h-[95%] rounded-xl"
        />
      ) : (
        <div className="loader-wrapper">
          <FontAwesomeIcon icon={faCircleNotch} className="loader text-9xl" />
        </div>
      )}
    </div>
  );
}
