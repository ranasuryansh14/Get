// src/components/auth/Form.jsx
import { useState } from "react";
import Api from "../../Api"; // Ensure this is configured to point to your backend
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../Constants";
import "./Form.css";
import LoadingIndicator from "./LoadingIndicator";
import {jwtDecode} from "jwt-decode"; // Correct import

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "Login" ? "Login" : "SignUp";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await Api.post(route, { username, password });
            console.log('Response Data:', res.data); // Log response for debugging
            
            if (method === "Login") {
                // Store tokens in local storage
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                // Decode the access token to get user info
                const decoded = jwtDecode(res.data.access);
                const userId = decoded.user_id;
                const username = decoded.username;

                // Log the user ID and username
                console.log('User ID:', userId);
                console.log('Username:', username);

                // Save to local storage
                localStorage.setItem('user_id', userId);
                localStorage.setItem('username', username);

                // Navigate to the home page or desired location
                navigate("/");
            } else {
                navigate("/auth/Login");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.detail || "Login failed. Please check your credentials.";
            alert(errorMessage);
            console.error('Error during login/signup:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit" disabled={loading}>
                {name}
            </button>
        </form>
    );
}

export default Form;
