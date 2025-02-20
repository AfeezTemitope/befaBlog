import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Article {
    title: string;
    description: string;
    url: string;
}

const FootballNews: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const apiUrl = import.meta.env.VITE_NEWS_API_URL

    useEffect(() => {
        const fetchFootballNews = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                    params: {
                        category: 'sports',
                        q: 'football',
                        apiKey: apiUrl
                    },
                });
                setArticles(response.data.articles);
            } catch (err: any) {
                setError(`Failed to fetch football news: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchFootballNews();
    }, []);


    return (
        <div className="container mx-auto p-4">
            {loading && <p className="text-center text-xl">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {articles.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {articles.map(({ title, description, url }, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                            <p className="text-gray-600 mt-2">{description}</p>
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-4 inline-block">
                                Read more
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FootballNews;