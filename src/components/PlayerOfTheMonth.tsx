import React, { useState, useEffect } from 'react';
import {FaTrophy} from "react-icons/fa"

interface Player {
    name: string;
    position: string;
    image_urls: string[];
}

const PlayerOfTheMonth: React.FC = () => {
    const [player, setPlayer] = useState<Player | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:5000/';

    useEffect(() => {
        const fetchPlayer = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`${apiUrl}player`);
                const contentType = response.headers.get("Content-Type");

                if (response.ok && contentType?.includes("application/json")) {
                    const data = await response.json();
                    setPlayer(data);
                } else {
                    const text = await response.text();
                    console.error("Error: Expected JSON, but got:", text);
                    setError("Error fetching player data.");
                }
            } catch (error) {
                console.error("Error fetching player:", error);
                setError("An error occurred while fetching player data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlayer();
    }, [apiUrl]);


    if (isLoading) {
        return <div className="text-center text-lg font-medium text-gray-700 py-8">Loading player information...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-8">{error}</div>;
    }

    if (player) {
        return (
            <div className="container mx-auto p-2">
                <div className="bg-black rounded-lg shadow-md p-4 mb-4 text-center border-4 border-green-500">
                    <h1 className="text-3xl font-bold text-green-500 mb-1 flex items-center justify-center">
                        <FaTrophy className="text-white mr-2 text-5xl font-extrabold"/>
                        PLAYER OF THE MONTH
                        <FaTrophy className="text-white ml-2 text-5xl font-extrabold"/>
                    </h1>
                    <h2 className="text-2xl font-bold text-white mb-1">{player.name}</h2>
                    <p className="text-gray-400 font-semibold">{player.position}</p>
                </div>

                <div className="flex flex-nowrap overflow-x-auto gap-4 py-4 sm:py-6">
                    {player.image_urls.map((imageUrl, index) => (
                        <div key={index}
                             className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 overflow-hidden rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-90 flex-shrink-0">
                            <img
                                src={imageUrl}
                                alt={`Player Image ${index + 1}`}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return <div className="text-center text-lg font-medium text-gray-700 py-8">No player information
            available.</div>;
    }
};

export default PlayerOfTheMonth;