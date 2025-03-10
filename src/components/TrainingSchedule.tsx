import React, { useState, useEffect } from 'react';

interface TrainingDay {
    id?: number;
    day: string;
    date: string;
    time: string;
    venue: string;
    jersey_color: string;
}

const TrainingSchedule: React.FC = () => {
    const [trainingSchedule, setTrainingSchedule] = useState<TrainingDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:5000/';

    useEffect(() => {
        const fetchSchedule = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${apiUrl}schedule`);
                const contentType = response.headers.get("Content-Type");

                if (response.ok && contentType?.includes("application/json")) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: TrainingDay[] = await response.json();
                setTrainingSchedule(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [apiUrl]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4 text-center items-center justify-center">
            <h2 className="text-xl font-bold mb-4 text-green-500">Training Schedule</h2>
            <div className="overflow-x-auto whitespace-nowrap">
                {trainingSchedule.map((day) => (
                    <div key={day.id} className="inline-block border p-4 rounded shadow m-2">
                        <p><strong className="text-red-500">Day:</strong> {day.day}</p>
                        <p><strong>Date:</strong> {day.date}</p>
                        <p><strong className="text-green-700">Time:</strong> {day.time}</p>
                        <p><strong>Venue:</strong> {day.venue}</p>
                        <p><strong>Jersey Color:</strong> {day.jersey_color}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainingSchedule;
