import { useState } from 'react'
import axios from 'axios';
import Layout from '../components/layout/layout'
import SelectField from '../components/inputfields/SelectField'
import StockData from '../components/StockData';
import { API_KEY, INTERVAL_OPTIONS } from '../constants';

const Home = () => {
    const [interval, setInterval] = useState<string>("5min")
    const [disabled, setDisabled] = useState<boolean>(false)
    const downloadcsv = async () => {
        setDisabled(true)
        try {
            const resp = await axios.get(
                `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=${interval}&apikey=${API_KEY}&datatype=csv`
            );
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(resp.data);
            hiddenElement.target = '_blank';
            hiddenElement.download = `Intraday_${interval}.csv`;
            hiddenElement.click();
            setDisabled(false);
        } catch (error) {
            setDisabled(false);
        }
    }
    return (
        <Layout>
            <h1 className='text-2xl mb-3'>Intraday</h1>
            <div className='flex justify-between items-center'>
                <SelectField label='Interval' value={interval} onChange={(event) => setInterval(event.target.value)} options={INTERVAL_OPTIONS} />
                <button disabled={disabled} onClick={downloadcsv} className='px-4 py-1 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm'>Download CSV</button>
            </div>
            <StockData interval={interval} apifunction={"TIME_SERIES_INTRADAY"} />
        </Layout>
    )
}

export default Home