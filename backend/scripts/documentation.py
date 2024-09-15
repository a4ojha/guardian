from inference import get_model
import supervision as sv
import cv2
from dotenv import load_dotenv
import os
import vlc
import time
from whisper import get_speech_text
from GPTsentiment import detect_distress
import requests

load_dotenv()
path = os.path.abspath("speech.mp3")
# p = vlc.MediaPlayer("file://" + path)
p = vlc.MediaPlayer("speech.mp3")


API_KEY = os.getenv('ROBOFLOW_API_KEY')
url_root = 'https://formerly-dashing-bunny.ngrok-free.app/'

# load a pre-trained yolov8n model
model = get_model(model_id="fall-detection-ca3o8/4", api_key=API_KEY)

video = cv2.VideoCapture(1)
over_thresh_cnt = 0

# Infer via the Roboflow Infer API and return the result
def infer(dbid):
    global over_thresh_cnt
    # Get the current image from the webcam
    ret, img = video.read()
    cv2.imshow('image', img)

    results = model.infer(img)[0]
    detections = sv.Detections.from_inference(results)

    if len(detections.confidence) == 0:
        return
    
    if detections.confidence[0] > 0.8:
        over_thresh_cnt += 1
        if over_thresh_cnt > 10:
            print("this is a FALL")
            p.play()

            words = get_speech_text()
            if detect_distress(words):
                requests.get(f'{url_root}call_emergency?dbid={dbid}')
                requests.get(f'{url_root}text_emergency?dbid={dbid}')
                requests.post(f'{url_root}add_fall_event?dbid={dbid}', json={'time': time.time(), 'event': 'fall'})

            over_thresh_cnt = 0
            time.sleep(60)
    else:
        over_thresh_cnt = 0


def main(dbid):
    while 1:
        # On "q" keypress, exit
        if(cv2.waitKey(1) == ord('q')):
            break

        # Synchronously get a prediction from the Roboflow Infer API
        infer(dbid)

if __name__ == '__main__':
    main("66e5ddbc7c757f3c10cac13a")