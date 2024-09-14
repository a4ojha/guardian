from flask import Flask, render_template
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import cv2
import base64

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize the webcam
camera = cv2.VideoCapture(0)

def gen_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            # Encode the frame in JPEG format
            _, buffer = cv2.imencode('.jpg', frame)
            # Convert to base64 to send via WebSocket
            frame_data = base64.b64encode(buffer).decode('utf-8')
            yield frame_data

@app.route('/')
def index():
    return "Webcam streaming server is running."

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('request_frame')
def stream_video():
    for frame_data in gen_frames():
        # Emit each frame to the frontend
        socketio.emit('video_frame', frame_data)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
