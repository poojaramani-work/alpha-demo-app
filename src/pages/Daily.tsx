import React, { useState } from 'react'
import axios from 'axios'
import Layout from '../components/layout/layout'
import { API_KEY } from '../constants'
import StockData from '../components/StockData'

const Daily = () => {
    const [disabled, setDisabled] = useState<boolean>(false)
    const downloadcsv = async () => {
        setDisabled(true)
        try {
            const resp = await axios.get(
                `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${API_KEY}&datatype=csv`
            );
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(resp.data);
            hiddenElement.target = '_blank';
            hiddenElement.download = `Daily.csv`;
            hiddenElement.click();
            setDisabled(false);
        } catch (error) {
            setDisabled(false);
        }
    }
    return (
        <Layout>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl mb-3'>Daily</h1>
                <button disabled={disabled} onClick={downloadcsv} className='px-4 py-1 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm'>Download CSV</button>
            </div>
            <StockData apifunction={"TIME_SERIES_DAILY"} />
        </Layout>
    )
}

export default Daily