from flask import Flask, render_template, Response, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from twilio_component.call_text_manager import call_emergency, text_emergency
from urllib import parse
from pymongo.mongo_client import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
import cv2
import base64
import os

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

load_dotenv()

mongo_client = MongoClient(os.getenv('database_uri'))
db = mongo_client.get_database('users')
user_info = db.get_collection('user_info')

camera_data = {}

def gen_frames(dbid):
    while True:
        if dbid not in camera_data:
            break
        yield camera_data[dbid]

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
def stream_video(json):
    for frame_data in gen_frames(json.get('dbid')):
        # Emit each frame to the frontend
        socketio.emit('video_frame', frame_data)

@socketio.on('video_frame')
def handle_video_frame(data):
    dbid = data.get('dbid')
    frame = data.get('frame')

    camera_data[dbid] = frame

    socketio.emit('receive_frame', {'dbid': dbid, 'frame': frame}, to=dbid)

@socketio.on('subscribe_camera')
def subscribe_camera(data):
    join_room(data.get('dbid'))

@socketio.on('unsubscribe_camera')
def unsubscribe_camera(data):
    leave_room(data.get('dbid'))

# Phone call endpoint
@app.route('/call_emergency')
def call_em():
    dbid = parse.quote_plus(request.args.get('dbid'))
    info = user_info.find_one({'_id': ObjectId(dbid)})
    # https://formerly-dashing-bunny.ngrok-free.app/call_emergency?name=John%20Doe&location=E7
    twiml_url = f"https://infinite-remotely-calf.ngrok-free.app/generate_twiml?name={parse.quote_plus(info['name'])}&location={parse.quote_plus(info['location'])}"
    return call_emergency(to_number='+15873727398', url=twiml_url)

@app.route('/text_emergency')
def text_em():
    dbid = parse.quote_plus(request.args.get('dbid'))
    info = user_info.find_one({'_id': ObjectId(dbid)})
    ret = []

    for contact in info['contacts']:
        ret.append(text_emergency(to_number=contact['phone_number'], to_name=contact['name'], patient_name=info['name'], location=info['location']))

    return ret

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

@app.route('/get_user_info', methods=['GET'])
def get_user_info():
    dbid = request.args.get('dbid')
    info = user_info.find_one({'_id': ObjectId(dbid)})
    info['_id'] = str(info['_id'])
    return info

@app.route('/update_user_info', methods=['POST'])
def update_user_info():
    dbid = request.args.get('dbid')
    info = request.json
    user_info.update_one({'_id': ObjectId(dbid)}, {'$set': info})
    return info
    
@app.route('/add_user', methods=['POST'])
def add_user():
    info = request.json
    info['log_events'] = []
    result = user_info.insert_one(info)
    return result.inserted_id

@app.route('/add_fall_event', methods=['POST'])
def add_log_event():
    dbid = request.args.get('dbid')
    event = request.json
    user_info.update_one({'_id': ObjectId(dbid)}, {'$push': {'log_events': event}})
    return event

@app.route('/get_fall_events', methods=['GET'])
def get_log_events():
    dbid = request.args.get('dbid')
    info = user_info.find_one({'_id': ObjectId(dbid)})
    return info['log_events']

@app.route('/upload_camera', methods=['PUT'])
def connect_to_camera():
    dbid = request.args.get('dbid')
    camera_data[dbid] = request.data.decode('utf-8')
    print("received frame")
    return camera_data[dbid]

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
    # 66e5ddbc7c757f3c10cac13a dbid