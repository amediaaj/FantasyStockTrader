import { Box, Typography } from '@mui/material';
import TimeSeriesCard from './TimeSeriesCard';
import { useUserTimeSeries } from '../../../lib/hooks/useUserTimeSeries';

const TimeSeriesList = () => {
  const { userTimeSeries, isLoading } = useUserTimeSeries();

  if (isLoading) return <Typography>Loading...</Typography>;

  if (!userTimeSeries) return <Typography>No stock positions</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {userTimeSeries.map(item => (
        <TimeSeriesCard key={item.tickerSymbol} ticker={item.tickerSymbol} />
      ))}
    </Box>
  );
};

export default TimeSeriesList;
