from flask import Flask, request, Response
from call_text_manager import call_emergency
from urllib import parse

app = Flask(__name__)

@app.route('/call_emergency')
def call_em():
    name = parse.quote_plus(request.args.get('name'))
    location = parse.quote_plus(request.args.get('location'))
    # https://formerly-dashing-bunny.ngrok-free.app/call_emergency?name=John%20Doe&location=E7
    twiml_url = f"https://formerly-dashing-bunny.ngrok-free.app/generate_twiml?name={name}&location={location}"
    return call_emergency(to_number='+16477007379', url=twiml_url)

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

# Running the Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)