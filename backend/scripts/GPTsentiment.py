import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

def detect_distress(text):
    # Prepare the prompt for the API
    prompt = f"""Analyze the following text and determine if the person seems to be in distress.
    If they seem to be in distress, respond with "Call".
    If they don't seem to be in distress, respond with "Don't call".
    Only respond with "Call" or "Don't call".

    Text: {text}

    Response:"""

    # Make the API call
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",  # You can change this to a different model if needed
        messages=[
            {"role": "system", "content": "You are a helpful assistant that analyzes text for signs of distress."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=4,  # We only need a short response
        n=1,
        stop=None,
        temperature=0.5,
    )

    # Extract and return the response
    result = response.choices[0].message.content
    return result == 'Call'

# Example usage
if __name__ == "__main__":
    sample_text = "I'm fine ahhhhhhhh im dying"
    result = detect_distress(sample_text)
    print(f"Result: {result}")