# 🏠 Bangalore House Price Prediction

A full-stack Machine Learning web application to estimate house prices in Bangalore based on area, location, number of bedrooms (BHK), and bathrooms.

[🔗 Live Demo](https://bhp-mlproject-1.onrender.com) • [📁 Dataset](https://www.kaggle.com/datasets) • [📦 GitHub Repo](https://github.com/ajay-m-l/BHP_MLProject)

## 🚀 Project Overview

This project uses a Linear Regression model trained on Bangalore housing data to predict home prices. It integrates a Flask backend with an HTML/CSS + JavaScript frontend for seamless user interaction and real-time predictions.

## 🛠️ Tech Stack

### 🎯 Frontend
- HTML5, CSS3
- JavaScript
- Bootstrap (optional)

### ⚙️ Backend
- Python
- Flask
- Flask-CORS
- Gunicorn (for deployment)

### 📊 Machine Learning
- Scikit-learn
- Pandas
- NumPy
- Joblib (for saving/loading model)

### ☁️ Deployment
- Render

## 📦 Features

- 🔎 Predict house price based on inputs like area (sqft), BHK, bathrooms, and location
- 📍 Dynamic dropdown populated with real location names from dataset
- 📈 Cleaned and preprocessed dataset with outlier handling
- 🖥️ Frontend form with validation and loading indicators
- 🌐 Deployed online using Render

## 🧠 How It Works

1. **Data Preprocessing**: Cleaned dataset, removed outliers, and encoded categorical features.
2. **Model Training**: Trained a Linear Regression model using `scikit-learn`.
3. **Model Persistence**: Used `joblib` to save the model and `columns.json` for location mapping.
4. **API**:
    - `GET /get_location_names`: Returns available location names
    - `POST /predict_home_price`: Returns estimated price based on input
## 📂 Project Structure

