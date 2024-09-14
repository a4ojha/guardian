from openai import OpenAI
client = OpenAI()

# Transcribe audio
audio_file = open("/path/to/file/audio.mp3", "rb")
transcription = client.audio.transcriptions.create(
    model="whisper-1", 
    file=audio_file,
    response_format="text"
)

# Perform sentiment analysis
sentiment_prompt = f"""This text is a response after someone has asked if they are doing okay. If there is no clear indication that this person is doing well and is okay, then return 'Don't call', but if there is an indication that this person may need help, then return 'Call'

Text: {transcription}

Sentiment:"""

sentiment_response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant that performs sentiment analysis."},
        {"role": "user", "content": sentiment_prompt}
    ]
)

sentiment = sentiment_response.choices[0].message.content.strip()

print("Transcription:", transcription)
print("Sentiment Analysis Result:", sentiment)