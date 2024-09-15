import requests
from dotenv import load_dotenv
import os
import base64

load_dotenv()

API_KEY = os.getenv('SPEECHIFY_API_KEY')

def text2speech(text_content):
    url = 'https://api.sws.speechify.com/v1/audio/speech'

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "content-type": "application/json",
    }

    data = {
        "input": f"<speak>{text_content}</speak>",
        "voice_id": "Carly",
        "audio_format": "mp3"
    }

    print(API_KEY)

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        data = response.json()
        print("MP3 generated")
        
        decoded_audio_data = base64.b64decode(data['audio_data'])

        # with open("speech.mp3", "wb") as f:
        #     f.write(decoded_audio_data)
        
        return decoded_audio_data
        
    else:
        return f"Failed to convert to speech: {response.status_code}"
