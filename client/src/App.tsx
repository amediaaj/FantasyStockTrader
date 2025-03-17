import { List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import KeyChain from "./lib/keys/keychain";
import axios from "axios";

function App() {
  const [stockData, setStockData] = useState<TimeSeries[]>([])
  const url = (timeSeriesDetail: UserTimeSeries) => {
    return 'https://www.alphavantage.co/query?' + 
      `function=${timeSeriesDetail.function}&` +
      `symbol=${timeSeriesDetail.tickerSymbol}&apikey=${new KeyChain().primary}`
  }

  useEffect(() => {

    (async function fetchData(){
      try {
        const userTimeSeriesResponse = 
        await axios.get<UserTimeSeries[]>('https://localhost:5001/api/timeseries');
        
        const timeSeriesResponse = await Promise.all(
          userTimeSeriesResponse.data.map((timeSeriesDetail: UserTimeSeries) =>
            axios.get<TimeSeries>(url(timeSeriesDetail))))

        setStockData(timeSeriesResponse .map((item) => item.data))
      } catch(error) {
        console.error('Promise rejected with error: ' + error);
      }  
    })();    
   }, [])

  return (
    <>
      <Typography variant='h3'>Fantasy Stock Trader</Typography>
      <List>
      {stockData.map((item) => (
          <ListItem key={item['Meta Data']['2. Symbol']}>{item["Meta Data"]['2. Symbol']}</ListItem>
        ))}
      </List>
    </>
  )
}

export default App
