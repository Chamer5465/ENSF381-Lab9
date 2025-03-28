import {React, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Login.css';
    
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const backendEndpoint = 'http://127.0.0.1:5000/validate_login';
        fetch(backendEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username':username, 'password':password}),
        })
        .then(response => response.json())
        .then(response => {
            console.log(response.success)
            if (response.success) {
                setAuthenticated(true);
                setMessage(response.message);
            } else {
                setAuthenticated(false);
                setMessage(response.message);
            }
        }) .catch (error => console.log(error));
    }
    if (authenticated) {
        navigate("/predict");
    } 
    return (
        <div>
            <div className="container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h3>Login</h3>
                    <label for='username'>Username:</label>
                    <br/>
                    <input className="user-input" type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                    <br/>
                    <label for='password'>Password:</label>
                    <br/>
                    <input className="user-input" type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                    <br/>
                    <button className="login-button" type='submit'>Login</button>
                </form>
            </div>
            <p className="message">{message}</p>
        </div>
    );
}

export default Login;