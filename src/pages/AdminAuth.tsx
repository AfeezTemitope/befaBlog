import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../assets/befa.png';

const AdminAuth: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:5000/';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(`${apiUrl}login`, {
                method: "POST",
                headers: {
                    "Authorization": "Basic " + btoa(username + ":" + password),
                },
            });

            if (response.ok) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                setUsername(""); // Clear form fields
                setPassword("");
                history("/PlayerCreation");
            } else if (response.status === 401) {
                setError("Invalid credentials");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed");
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError("An error occurred during login.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen bg-cover bg-center relative flex items-center justify-center bg-[length:100%_100%]" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 max-w-sm w-full mx-auto p-6 border border-gray-300 rounded-md shadow-lg bg-white bg-opacity-80">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 disabled:bg-gray-400"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mx-auto"></div>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminAuth;