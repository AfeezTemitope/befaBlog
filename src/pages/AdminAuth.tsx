import React, { useState, useEffect } from 'react';

interface PlayerData {
    full_name: string;
    position: string;
}

const AdminAuth: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [playerData, setPlayerData] = useState<PlayerData>({
        full_name: '',
        position: '',
    });
    const [images, setImages] = useState<File[]>([]);
    const [message, setMessage] = useState('');
    const hostname = 'http://127.0.0.1:5000';

    // Effect hook to check if the user is authenticated
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${hostname}/check-auth`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Basic ' + btoa(username + ':' + password),
                    },
                });
                if (response.ok) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
            }
        };

        // Check auth only if username and password are provided
        if (username && password) {
            checkAuth();
        }
    }, [username, password]);

    // Handle User Login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${hostname}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(username + ':' + password),
                },
            });

            if (response.ok) {
                setIsAuthenticated(true);
                setLoginMessage('');
            } else {
                const errorData = await response.json();
                setLoginMessage(errorData.message || 'Invalid credentials.');
            }
        } catch (error) {
            setLoginMessage('An error occurred.');
        }
    };

    // Handle image file selections
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files);
            setImages((prevImages) => [...prevImages, ...newImages]);
        }
    };

    // Handle Player info submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('full_name', playerData.full_name);
        formData.append('position', playerData.position);
        images.forEach((image) => formData.append('images', image));

        try {
            const response = await fetch(`${hostname}/player`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage('Player information updated.');
                setPlayerData({ full_name: '', position: '' });
                setImages([]);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Error updating player information.');
            }
        } catch (error) {
            setMessage('An error occurred during submission.');
        }
    };

    // Handle input changes for player data
    const handlePlayerDataChange = (field: keyof PlayerData, value: string) => {
        setPlayerData((prevData) => ({ ...prevData, [field]: value }));
    };

    // Form and input styling
    const formStyles = "flex flex-col gap-4 p-6 text-white rounded-lg shadow-md w-full max-w-md mx-auto";
    const inputStyles = "p-2 border border-lemon text-gray rounded focus:outline-none focus:border-lemon focus:ring-1 focus:ring-lemon";
    const buttonStyles = "p-2 bg-lemon text-white hover:bg-green-500 rounded transition duration-300";

    // Render login form
    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-800">
                <form onSubmit={handleLogin} className={formStyles}>
                    <h2 className="text-xl text-lemon text-center mb-4 font-bold">ADMIN LOGIN</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={inputStyles}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputStyles}
                    />
                    <button type="submit" className={buttonStyles}>Login</button>
                    {loginMessage && <p className="text-red-500">{loginMessage}</p>}
                </form>
            </div>
        );
    }

    // Render player data update form
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <form onSubmit={handleSubmit} className={formStyles}>
                <h2 className="text-xl text-lemon text-center mb-4 font-bold">Update Player Info</h2>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={playerData.full_name}
                    onChange={(e) => handlePlayerDataChange('full_name', e.target.value)}
                    className={inputStyles}
                />
                <input
                    type="text"
                    placeholder="Position"
                    value={playerData.position}
                    onChange={(e) => handlePlayerDataChange('position', e.target.value)}
                    className={inputStyles}
                />
                <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className={inputStyles}
                />
                {images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index}`}
                                className="w-20 h-20 object-cover border border-lemon rounded"
                            />
                        ))}
                    </div>
                )}
                <button type="submit" className={buttonStyles}>Update Player</button>
                {message && <p className="text-red-500">{message}</p>}
            </form>
        </div>
    );
};

export default AdminAuth;