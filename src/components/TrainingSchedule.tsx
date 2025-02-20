import React from 'react';

interface TrainingDay {
    day: string;
    date: string;
    time: string;
    venue: string;
    jersey_color: string;
}

const TrainingScheduleItem: React.FC<{ trainingDay: TrainingDay }> = ({ trainingDay }) => {
    const getJerseyColorClass = (jerseyColor: string) => {
        switch (jerseyColor.toLowerCase()) {
            case 'red': return 'text-red-500';
            case 'blue': return 'text-blue-500';
            case 'green': return 'text-green-500';
            case 'yellow': return 'text-yellow-500';
            default: return 'text-gray-700';
        }
    };

    return (
        <div className={`bg-white rounded-lg shadow-md p-2 flex-shrink-0 w-60 flex-col ${getJerseyColorClass(trainingDay.jersey_color)}`}>
            <div className={`text-center font-bold mb-1 ${getJerseyColorClass(trainingDay.jersey_color)}`}>
                {trainingDay.day}
            </div>
            <p className="text-gray-700 text-sm text-center font-semibold">{trainingDay.date}</p>
            <p className="text-gray-700 text-sm text-center font-semibold">Time: {trainingDay.time}</p>
            <p className="text-gray-700 text-sm text-center font-semibold">Venue: {trainingDay.venue}</p>
        </div>
    );
};

const TrainingSchedule: React.FC = () => {
    const trainingSchedule: TrainingDay[] = [
        { day: "Monday", date: "2025-02-19", time: "10:00 AM", venue: "Stadium A", jersey_color: "Red" },
        { day: "Wednesday", date: "2025-02-21", time: "10:00 AM", venue: "Stadium B", jersey_color: "Blue" },
        { day: "Friday", date: "2025-02-23", time: "10:00 AM", venue: "Stadium C", jersey_color: "Green" },
        { day: "Saturday", date: "2025-02-24", time: "10:00 AM", venue: "Stadium D", jersey_color: "Yellow" },
    ];

    return (
        <div className="flex-col flex items-center mt-4 mb-4">
            <h3 className="text-l font-bold mb-2 text-center">Training Schedule</h3>
            <div className="overflow-x-auto whitespace-nowrap max-w-full">
                <div className="flex gap-4 p-2">
                    {trainingSchedule.map((trainingDay, index) => (
                        <TrainingScheduleItem key={index} trainingDay={trainingDay} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrainingSchedule;