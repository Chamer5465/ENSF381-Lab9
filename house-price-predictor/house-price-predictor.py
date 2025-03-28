from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

users = {
    'alice': 'password123',
    'bob': 'secure456',
    'charlie': 'qwerty789',
    'diana': 'hunter2',
    'eve': 'passpass',
    'frank': 'letmein',
    'grace': 'trustno1',
    'heidi': 'admin123',
    'ivan': 'welcome1',
    'judy': 'password1'
}

# Route to authenticate user
@app.route('/validate_login', methods=['POST'])
def authenticate_user():
    data = request.get_json()
    entered_username = data.get('username')
    entered_password = data.get('password')
    if entered_username in users:
        if users[entered_username] == entered_password:
            return jsonify({"success": True, "message": "Login was successful."})
    return jsonify({"success": False, "message": "Incorrect username or password."})

@app.route('/predict_house_price', methods=['POST'])
def predict_price():
    model = joblib.load("./src/random_forest_model.pkl")
    data = request.json
    cats = True if 'pets' in data and data['pets'] else False
    dogs = True if 'pets' in data and data['pets'] else False
    sample_data = [
        data['city'],
        data['province'],
        float(data['latitude']),
        float(data['longitude']),
        data['lease_term'],
        data['type'],
        float(data['beds']),
        float(data['baths']),
        float(data['sq_feet']),
        data['furnishing'],
        data['smoking'],
        cats,
        dogs
    ]
    sample_df = pd.DataFrame([sample_data], columns=[
        'city', 'province', 'latitude', 'longitude', 'lease_term',
        'type', 'beds', 'baths', 'sq_feet', 'furnishing',
        'smoking', 'cats', 'dogs'
    ])
    print(model)
    predicted_price = model.predict(sample_df)
    return jsonify({"predicted_price": float(predicted_price[0])})

if __name__ == '__main__':
    app.run()
    
