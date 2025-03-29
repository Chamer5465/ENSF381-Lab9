import {React, useState} from 'react';

import './HousePricePredictor.css'

function HousePricePredictor() {
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [lease_term, setLease_term] = useState("");
    const [type, setType] = useState("");
    const [beds, setBeds] = useState("");
    const [baths, setBaths] = useState("");
    const [sq_feet, setSq_feet] = useState("");
    const [furnishing, setFurnishing] = useState("");
    const [smoking, setSmoking] = useState("");
    const [pets, setPets] = useState("");

    const [predicted_price, setPredicet_price] = useState(0.0)

    async function handleSubmit(e) {
        e.preventDefault();
        const backendEndpoint = 'http://127.0.0.1:5000/predict_house_price';
        fetch(backendEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "city": city,
                "province": province,
                "latitude": latitude,
                "longitude": longitude,
                "lease_term": lease_term,
                "type": type,
                "baths": baths,
                "beds": beds,
                "sq_feet": sq_feet,
                "furnishing": furnishing,
                "smoking": smoking,
                "pets": pets
            }),
        })
        .then(response => response.json())
        .then(response => {
            console.log(predicted_price)
            setPredicet_price(response.predicted_price)
        });
    }

    return (
        <div className="house-container">
            <form onSubmit={handleSubmit} className="predict-form">
                <h1>House Price Predictor</h1>
                <label for="city">City:</label>
                <br/>
                <input className="predict-input" id="city" type="text" onChange={(e) => setCity(e.target.value)} required></input>
                <br/>
                <label for="province">Province:</label>
                <br/>
                <input className="predict-input" id="latitude" type="text" onChange={(e) => setProvince(e.target.value)} required></input>
                <br/>
                <label for="latitude">Latitude:</label>
                <br/>
                <input className="predict-input" id="latitude" type="text" onChange={(e) => setLatitude(e.target.value)} required></input>
                <br/>
                <label for="longitude">Longitude:</label>
                <br/>
                <input className="predict-input" id="longitude" type="text" onChange={(e) => setLongitude(e.target.value)} required></input>
                <br/>
                <label for="lease_term">Lease Term:</label>
                <br/>
                <input className="predict-input" id="lease_term" type="text" onChange={(e) => setLease_term(e.target.value)} required></input>
                <br/>
                <label for="type">Type:</label>
                <br/>
                <input className="predict-input" id="type" type="text" onChange={(e) => setType(e.target.value)} required></input>
                <br/>
                <label for="beds">Beds:</label>
                <br/>
                <input className="predict-input" id="beds" type="text" onChange={(e) => setBeds(e.target.value)} required></input>
                <br/>
                <label for="baths">Baths:</label>
                <br/>
                <input className="predict-input" id="baths" type="text" onChange={(e) => setBaths(e.target.value)} required></input>
                <br/>
                <label for="square_feet" >Square Feet:</label>
                <br/>
                <input className="predict-input" id="square_feet" type="text" onChange={(e) => setSq_feet(e.target.value)} required></input>
                <br/>
                <label for="furnishing">Furnishing:</label>
                <br/>
                <select className="predict-input" id="furnishing" onChange={(e) => setFurnishing(e.target.value)} required>
                    <option value="Furnashed">Furnished</option>
                    <option value="Partially Furnished">Partially Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                </select>
                <br/>
                <label for="smoking">Smoking:</label>
                <br/>
                <input className="predict-input" id="smoking" type="text" onChange={(e) => setSmoking(e.target.value)} required></input>
                <br/>
                <label for="pet">I have a pet:</label>
                <br/>
                <input className="predict-input" id="pet" type="checkbox" onChange={(e) => setPets(e.target.value)}></input>
                <br/>
                <button className="predict-button" type="submit">Predict</button>
            </form>
            <div className="predict-container">Predicted Rent Price: ${predicted_price}</div>
        </div>
    );
}

export default HousePricePredictor;