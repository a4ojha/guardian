import speech_recognition as sr

# obtain audio from the microphone
r = sr.Recognizer()

def get_speech_text():
    with sr.Microphone() as source:
        r.adjust_for_ambient_noise(source, duration=1)
        audio = r.listen(source, timeout=5)
        print("Done recording.")

    try:
        print("Recognizing the text...")
        text = r.recognize_google(audio, language="en-US")
        return text
    except sr.UnknownValueError:
        return "Google Speech Recognition could not understand the audio. Call emergency services"
    except sr.RequestError:
        return "Could not request results from Google Speech Recognition service."
    except Exception as ex:
        return "Error during recognition:" + ex