from inference import get_model
import supervision as sv
import cv2
from dotenv import load_dotenv
import os
import vlc
import time
from speech_to_text import get_speech_text
from GPTsentiment import detect_distress
import requests
import base64
import socketio

load_dotenv()
path = os.path.abspath("speech.mp3")
p = vlc.MediaPlayer("speech.mp3")
path = os.path.abspath("calling.mp3")
path = os.path.abspath("notcalling.mp3")
# p = vlc.MediaPlayer("file://" + path)
c = vlc.MediaPlayer("calling.mp3")
n = vlc.MediaPlayer("notcalling.mp3")

sio = socketio.Client()

API_KEY = os.getenv('ROBOFLOW_API_KEY')
url_root = 'https://infinite-remotely-calf.ngrok-free.app/'

# load a pre-trained yolov8n model
model = get_model(model_id="fall-detection-ca3o8/4", api_key=API_KEY)

video = cv2.VideoCapture(0)
over_thresh_cnt = 0

# Infer via the Roboflow Infer API and return the result
def infer(dbid):
    global over_thresh_cnt
    # Get the current image from the webcam
    ret, img = video.read()
    if not ret:
        return
    encoded_img = cv2.imencode('.jpg', img)[1].tobytes()
    sio.emit('video_frame', {'dbid': dbid, 'frame': base64.b64encode(encoded_img).decode('utf-8')})
    results = model.infer(img)[0]
    detections = sv.Detections.from_inference(results)

    if len(detections.confidence) == 0:
        return
    print(detections.confidence[0])
    if detections.confidence[0] > 0.8:
        over_thresh_cnt += 1
        if over_thresh_cnt > 1:
            print("Attention: A fall has been detected")
            p.play()

            words = get_speech_text()
            print(words)
            if detect_distress(words):
                c.play()
                requests.get(f'{url_root}call_emergency?dbid={dbid}')
                requests.get(f'{url_root}text_emergency?dbid={dbid}')
                requests.post(f'{url_root}add_fall_event?dbid={dbid}', json={'time': time.time(), 'event': 'fall'})
            else:
                n.play()
            over_thresh_cnt = 0
            time.sleep(60)
    else:
        over_thresh_cnt = 0


def main(dbid):
    while 1:
        # Synchronously get a prediction from the Roboflow Infer API
        infer(dbid)

if __name__ == '__main__':
    sio.connect(url_root)
    main("66e5ddbc7c757f3c10cac13a")
    sio.disconnect()