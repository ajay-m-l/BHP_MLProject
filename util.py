import json
import pickle
import numpy as np
import os

__locations = None
__data_columns = None
__model = None

def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)

def get_location_names():
    return __locations

def load_saved_artifacts():
    print("📦 Loading saved artifacts...")
    global __data_columns
    global __locations
    global __model

    base_dir = os.path.dirname(os.path.abspath(__file__))  # Absolute path
    columns_path = os.path.join(base_dir, "model", "columns.json")
    model_path = os.path.join(base_dir, "model", "banglore_home_prices_model.pickle")

    print(f"🔍 Looking for columns at: {columns_path}")
    print(f"🔍 Looking for model at: {model_path}")

    try:
        with open(columns_path, "r") as f:
            __data_columns = json.load(f)['data_columns']
            __locations = __data_columns[3:]
            print(f"✅ Loaded columns: {__data_columns[:5]} ...")
            print(f"✅ Loaded locations: {__locations[:5]} ...")
    except Exception as e:
        print(f"❌ Error reading columns.json: {e}")

    try:
        with open(model_path, "rb") as f:
            __model = pickle.load(f)
    except Exception as e:
        print(f"❌ Error reading model file: {e}")

    print("✅ Finished loading artifacts")

if __name__ == "__main__":
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('1st Phase JP Nagar', 1000, 3, 3))
