from flask import Flask, request, jsonify
from flask_cors import CORS
import util
import os

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return "✅ Bangalore Home Price Prediction API is running!"


@app.route('/get_location_names')
def get_location_names():
    print("get_location_names called")  # Debug print
    locations = util.get_location_names()
    print(f"Locations from util: {locations}")  # Debug print

    response = jsonify({
        'locations': locations,
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    total_sqft = float(request.json['total_sqft'])
    location = request.json['location']
    bhk = int(request.json['bhk'])
    bath = int(request.json['bath'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location, total_sqft, bhk, bath)
    })
    return response

# Load model before serving requests (for production)
try:
    util.load_saved_artifacts()
    print("Artifacts loaded successfully")
except Exception as e:
    print(f"Error loading artifacts: {e}")

# Do NOT run app here – Render uses gunicorn
# if __name__ == '__main__':
#     app.run(debug=True)
