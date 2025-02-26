import React, { useState } from 'react';

interface TrainingDay {
    id?: number;
    day: string;
    date: string;
    time: string;
    venue: string;
    jersey_color: string;
}

const AdminSchedule: React.FC = () => {
    const [newTrainingDays, setNewTrainingDays] = useState<TrainingDay[]>([
        {
            day: '',
            date: '',
            time: '',
            venue: '',
            jersey_color: '',
        },
    ]);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const list = [...newTrainingDays];

        if (list[index] && name in list[index]) {
            list[index] = { ...list[index], [name]: value }; // Correct way to update the object
            setNewTrainingDays(list);
        } else {
            console.error(`Invalid input name: ${name}`);
        }
    };

    const handleAddRow = () => {
        setNewTrainingDays([...newTrainingDays, { day: '', date: '', time: '', venue: '', jersey_color: '' }]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTrainingDays),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setMessage('Training days added successfully!');
            setNewTrainingDays([{ day: '', date: '', time: '', venue: '', jersey_color: '' }]); // Reset to a single empty row.
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="p-4 text-center items-center justify-center">
            <h2 className="text-xl font-bold mb-4">Add Training Days</h2>
            <form onSubmit={handleSubmit}>
                {newTrainingDays.map((day, index) => (
                    <div key={index} className="mb-4">
                        <input type="text" name="day" value={day.day} onChange={(event) => handleInputChange(index, event)} placeholder="Day" className="border p-2 mr-2" />
                        <input type="date" name="date" value={day.date} onChange={(event) => handleInputChange(index, event)} className="border p-2 mr-2" />
                        <input type="time" name="time" value={day.time} onChange={(event) => handleInputChange(index, event)} className="border p-2 mr-2" />
                        <input type="text" name="venue" value={day.venue} onChange={(event) => handleInputChange(index, event)} placeholder="Venue" className="border p-2 mr-2" />
                        <input type="text" name="jersey_color" value={day.jersey_color} onChange={(event) => handleInputChange(index, event)} placeholder="Jersey Color" className="border p-2" />
                    </div>
                ))}
                <button type="button" onClick={handleAddRow} className="bg-green-500 text-white p-2 rounded mr-2">Add Row</button>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Training Days</button>
            </form>
            {message && <p className="text-green-500 mt-2">{message}</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default AdminSchedule;
