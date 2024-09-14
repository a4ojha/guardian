from flask import Flask, render_template, Response, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from twilio_component.call_text_manager import call_emergency
from speechify.text2speech import text2speech
from urllib import parse
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

# Phone call endpoint
@app.route('/call_emergency')
def call_em():
    name = parse.quote_plus(request.args.get('name'))
    location = parse.quote_plus(request.args.get('location'))
    # https://formerly-dashing-bunny.ngrok-free.app/call_emergency?name=John%20Doe&location=E7
    twiml_url = f"https://formerly-dashing-bunny.ngrok-free.app/generate_twiml?name={name}&location={location}"
    return  call_emergency(to_number='+16477007379', url=twiml_url)

@app.route('/generate_twiml', methods=['GET', 'POST'])
def generate_twiml():
    name = request.args.get('name')
    location = request.args.get('location')

    response = f"""
    <Response>
        <Say>
            Hello, this is an emergency call. {name} has fallen and need emergency medical assistance at {location}.
        </Say>
    </Response>
    """
    return Response(response, mimetype='text/xml')

@app.route('/text2speech', methods=['POST'])
def convert_text2speech():
    text_content = "Hi, this is a test message"
    audio_data = text2speech(text_content)
    return Response(audio_data, mimetype='audio/mp3')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
