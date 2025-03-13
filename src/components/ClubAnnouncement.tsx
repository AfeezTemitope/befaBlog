import React, { useEffect, useState } from 'react';

interface ClubAnnouncementProps {
    imageUrl: string;
    caption: string;
    author: string;
    datePosted: string;
}

const AnnouncementApp: React.FC<ClubAnnouncementProps> = ({
                                                              imageUrl,
                                                              caption,
                                                              author,
                                                              datePosted,
                                                          }) => {
    return (
        <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
            <img
                src={imageUrl}
                alt="Club Announcement"
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white rounded-br-lg">
                <div className="text-lg font-bold">{caption}</div>
                <div className="text-sm">
                    {author} - {datePosted}
                </div>
            </div>
        </div>
    );
};

const ClubAnnouncement = () => {
    const [announcement, setAnnouncement] = useState<ClubAnnouncementProps | null>(null);
    const [otherImages, setOtherImages] = useState<string[]>([]);
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:5000/';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}club-announcement`);
                const data = await response.json();
                setAnnouncement({
                    imageUrl: data.image_urls[0],
                    caption: data.caption,
                    author: data.author,
                    datePosted: data.date_posted,
                });
                setOtherImages(data.image_urls.slice(1));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!announcement) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-2">
            <div className="flex flex-col md:flex-row md:justify-center">
                <div className="w-full md:w-2/3 flex justify-center mb-4 md:mb-0">
                    <AnnouncementApp
                        imageUrl={announcement.imageUrl}
                        caption={announcement.caption}
                        author={announcement.author}
                        datePosted={announcement.datePosted}
                    />
                </div>

                <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                    <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-visible">
                        {otherImages.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Additional Image ${index + 1}`}
                                className="w-32 h-32 flex-none object-cover rounded-lg"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubAnnouncement;