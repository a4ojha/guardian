from twilio.twiml.voice_response import VoiceResponse
from twilio.rest import Client
from json import load

from dotenv import load_dotenv
import os

load_dotenv()

account_sid = os.getenv('account_sid')
auth_token = os.getenv('auth_token')
phone_number = os.getenv('phone_number')
databasepw = os.getenv('databasepw')

client = Client(account_sid, auth_token)

def call_emergency(to_number, url):
    call = client.calls.create(
        to=to_number,
        from_=phone_number,
        url=url
    )

    return call.sid

def text_emergency(to_number, to_name, patient_name, location):
    message = client.messages.create(
        body=f"Hello, {to_name}. {patient_name} has fallen and needs emergency medical assistance at {location}.",
        from_=phone_number,
        to=to_number
    )

    return message.sid
