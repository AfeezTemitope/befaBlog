import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlayerCreation: React.FC = () => {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:5000/';
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const [imageCountError, setImageCountError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "name") {
            setName(value);
        } else if (name === "position") {
            setPosition(value);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);

            if (selectedFiles.length < 3 || selectedFiles.length > 5) {
                setImageCountError("Please select between 3 and 5 images.");
                setImages([]);
                setImagePreviews([]);
                return;
            }

            setImageCountError("");
            setImages(selectedFiles);

            const previews = selectedFiles.map((file) => URL.createObjectURL(file));
            setImagePreviews(previews);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (!isAuthenticated || !username || !password) {
            setError("Unauthorized. Please login.");
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("full_name", name);
        formData.append("position", position);
        images.forEach((image) => formData.append("images", image));

        try {
            const response = await fetch(`${apiUrl}player`, {
                method: "POST",
                headers: {
                    "Authorization": "Basic " + btoa(username + ":" + password),
                },
                body: formData,
            });

            if (response.ok) {
                alert("Player created successfully!");
                setName("");
                setPosition("");
                setImages([]);
                setImagePreviews([]);
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                history("/");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to create player.");
            }
        } catch (error) {
            console.error("Player creation error:", error);
            setError("An error occurred during player creation.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div
                className="max-w-lg w-full mx-auto p-4 md:p-6 lg:p-8 border border-gray-300 rounded-md shadow-lg bg-white">
                <h2 className="text-2xl font-semibold mb-4">Create Player</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Player Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                            Position
                        </label>
                        <input
                            type="text"
                            id="position"
                            name="position"
                            value={position}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="imageUrls" className="block text-sm font-medium text-gray-700">
                            Player Images (3-5 images)
                        </label>
                        <input
                            type="file"
                            id="imageUrls"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {imageCountError && <p className="text-red-500 text-sm mt-1">{imageCountError}</p>}

                        <div className="mt-2 flex flex-wrap -mx-2">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="px-2 w-24 h-24 mb-2">
                                    <img
                                        src={preview}
                                        alt={`Image ${index + 1}`}
                                        className="object-cover w-full h-full rounded"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 disabled:bg-gray-400"
                        disabled={isLoading || images.length < 3 || images.length > 5}
                    >
                        {isLoading ? (
                            <div
                                className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mx-auto"></div>
                        ) : (
                            "Create Player"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PlayerCreation;
