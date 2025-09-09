# Bangalore House Price Prediction

## Project Overview
This project predicts Bangalore house prices using key attributes like area, location, BHK, and bathrooms. It features a public web app that accepts user inputs, calls a prediction API, and displays the estimated price.


<img width="1863" height="927" alt="BHP " src="https://github.com/user-attachments/assets/3f6c5e15-8dc1-4938-8b41-7dd664432bfa" />

- **Goal:** Predict house prices accurately using linear regression.
- **Live Demo:** [https://bhp-mlproject-1.onrender.com](https://bhp-mlproject-1.onrender.com)
- **GitHub Repo:** [https://github.com/ajay-m-l/BHP_MLProject](https://github.com/ajay-m-l/BHP_MLProject)

## Tech Stack
- Python, Flask, scikit-learn, Pandas
- HTML, CSS, JavaScript (Bootstrap)
- Gunicorn for WSGI web server
- Render for cloud deployment
- Git and GitHub for version control

## Data Preparation & Model Training
- Dataset sourced from Kaggle (Bangalore housing dataset)
- Data cleaning: Handling missing values, unit standardization, outlier removal via IQR
- Feature engineering: One-hot encoding for 250+ locations; numeric features for BHK and bathrooms
- Model: Linear Regression (R² ~ 0.83, RMSE ~ ₹74L)
- Artifacts saved: model.pkl and columns.json

## Backend Architecture
- Flask app with routes:
  - `/` serves the app frontend
  - `/get_location_names` returns available locations (for dropdown)
  - `/predict_home_price` handles price prediction requests
- Uses `util.py` for loading model and prediction logic
- Gunicorn runs the app in production mode
- CORS enabled to allow frontend API calls

## Frontend Architecture
- Bootstrap-based input form in `templates/index.html`
- `static/app.js` for client-side logic and API communication
- Validates inputs and presents prediction results dynamically

## Local Development Setup
1. Create and activate virtual environment  
   `python -m venv venv && source venv/bin/activate`
2. Install dependencies  
   `pip install -r requirements.txt`
3. Run Flask dev server  
   `python app.py`
4. Test API endpoints with Postman or browser

## Deployment on Render
1. Create new Web Service and connect GitHub repo
2. Build Command: `pip install -r requirements.txt`
3. Start Command: `gunicorn app:app`
4. Render assigns random port; app reads `$PORT`
5. Note: Free tier instances sleep after 15 minutes of inactivity

## Troubleshooting
- Static file 404 errors resolved by using `url_for('static', ...)`
- TemplateNotFound: Ensure `templates/` folder exists in root
- ModuleNotFoundError (flask_cors): Check correct casing in requirements (`Flask-Cors`)
- Pin correct scikit-learn version or retrain if warnings occur

## Future Improvements
- Add authentication and user history
- Use Docker and GitHub Actions for CI/CD
- Experiment with Gradient Boosting (XGBoost) for accuracy
- Replace vanilla JS frontend with React or Vue.js
