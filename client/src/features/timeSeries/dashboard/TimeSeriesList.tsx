import { Box, Typography } from "@mui/material";
import TimeSeriesCard from "./TimeSeriesCard";
import { useTimeSeries } from "../../../lib/hooks/useTimeSeries";


const TimeSeriesList = () => {
  const {timeSeriesList, isPending} = useTimeSeries();

  if(!timeSeriesList || isPending) return <Typography>Loading...</Typography>

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        {timeSeriesList.map(timeSeries => (
            <TimeSeriesCard 
              key={timeSeries["Meta Data"]["2. Symbol"]} 
              timeSeries={timeSeries} 
            />  
        ))}
    </Box>
  )
}

export default TimeSeriesList;