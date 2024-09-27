import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../constants';

interface StockApiResponse {
    'Meta Data': {
        '1. Information': string;
        '2. Symbol': string;
        '3. Last Refreshed': string;
        '4. Interval': string;
    };
    [key: string]: any;
}

interface StockDataProps {
    interval?: string;
    apifunction: string;
}

const StockData: React.FC<StockDataProps> = ({ interval, apifunction }) => {
    const [data, setData] = useState<StockApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get<StockApiResponse>(
                    `https://www.alphavantage.co/query?function=${apifunction}&symbol=IBM${interval ? `&interval=${interval}` : ""}&apikey=${API_KEY}`
                );
                setData(response.data);
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [interval, apifunction]);

    if (loading) {
        return <p>Loading data...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!data) {
        return <p>No data available</p>;
    }
    const timeSeries = data[`Time Series (${interval ? interval : "Daily"})`];

    if (!timeSeries) {
        return <p>No time series data available for this interval.</p>;
    }
    const metaData = data['Meta Data'];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Stock Data for {metaData['2. Symbol']}</h1>
            <p>Last Refreshed: {metaData['3. Last Refreshed']}</p>
            {interval &&
                <p>Interval: {metaData['4. Interval']}</p>
            }
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Timestamp</th>
                        <th className="px-4 py-2">Open</th>
                        <th className="px-4 py-2">High</th>
                        <th className="px-4 py-2">Low</th>
                        <th className="px-4 py-2">Close</th>
                        <th className="px-4 py-2">Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(timeSeries).map((timestamp) => (
                        <tr key={timestamp}>
                            <td className="border px-4 py-2">{timestamp}</td>
                            <td className="border px-4 py-2">{timeSeries[timestamp]['1. open']}</td>
                            <td className="border px-4 py-2">{timeSeries[timestamp]['2. high']}</td>
                            <td className="border px-4 py-2">{timeSeries[timestamp]['3. low']}</td>
                            <td className="border px-4 py-2">{timeSeries[timestamp]['4. close']}</td>
                            <td className="border px-4 py-2">{timeSeries[timestamp]['5. volume']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockData;
