from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import util
import os

app = Flask(__name__, static_url_path='/static')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')  # serves templates/index.html

@app.route('/get_location_names')
def get_location_names():
    locations = util.get_location_names()
    return jsonify({'locations': locations})

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    data = request.get_json()
    total_sqft = float(data['total_sqft'])
    location = data['location']
    bhk = int(data['bhk'])
    bath = int(data['bath'])

    estimated_price = util.get_estimated_price(location, total_sqft, bhk, bath)
    return jsonify({'estimated_price': estimated_price})

# Load artifacts
try:
    util.load_saved_artifacts()
    print("Artifacts loaded successfully")
except Exception as e:
    print(f"Error loading artifacts: {e}")
