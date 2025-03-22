import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Typography, useTheme } from "@mui/material";
import { Link } from "react-router";
import { BaseSyntheticEvent } from "react";
import { AccessTime, Place } from "@mui/icons-material";
import { tokens } from "../../../lib/themes/theme";
import TimeSeriesChart from "../chart/TimeSeriesChart";
import { useTimeSeries } from "../../../lib/hooks/useTimeSeries";

type Props = {
    ticker: string
}

const TimeSeriesCard = ({ ticker }: Props) => {
  const {timeSeries, isPending} = useTimeSeries(ticker);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode) 

  const handleImageError = (e: BaseSyntheticEvent) => {
    e.target.onerror = null;
    // e.target.style.display = 'none'
    e.target.src = "https://placehold.co/400?text=.png"
  }

  if(!timeSeries || isPending) return <></>

  return (
    <Card elevation={3} sx={{borderRadius: 3}}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <CardHeader
          title={timeSeries["Meta Data"]["2. Symbol"]}
          titleTypographyProps={{
            fontWeight: 'bold',
            fontSize: 20
          }}
          subheader={
            <CardMedia
              component="img"
              sx={{ display: "flex", maxWidth: 50, marginLeft: '9px'}} 
              height="50"
              src={`https://eodhd.com/img/logos/US/${timeSeries["Meta Data"]["2. Symbol"]}.png`}
              onError={handleImageError}
            >
          </CardMedia>
          }
        />
      </Box>
      <Divider sx={{bgcolor: colors.blueAccent[400]}}/>
      <CardContent >
        <Box display='flex' sx={{minHeight: '250px'}}>
          <Box display='flex' flexDirection='column' mb={2} px={2}>
            <Box display='flex'>
              <AccessTime sx={{mr: 1}}/>
              <Typography variant='body2'>{timeSeries["Meta Data"]["3. Last Refreshed"]}</Typography>
            </Box>
            <Box display='flex'>
              <Place sx={{mr: 1}}/>
              <Typography variant='body2'>{timeSeries["Meta Data"]["5. Time Zone"]}</Typography>
            </Box>
          </Box>
          <Box height='100' width='100%' border='2px dotted' borderColor={colors.blueAccent[400]}>
            <TimeSeriesChart timeseriesDaily={timeSeries["Time Series (Daily)"]} />
          </Box>
        </Box>
      </CardContent>
      <Divider sx={{mb: 3, bgcolor: colors.blueAccent[400]}}/>
      <CardActions sx={{display: 'flex', justifyContent: 'end', pb:2, pr: 2}}>
          <Box display={'flex'} gap={3}>
            <Button 
              component={Link}
              to={`/trade/${timeSeries["Meta Data"]["2. Symbol"]}`}
              size='medium'
              variant="contained"
              color='inherit'
            >
              Trade
            </Button>
          </Box>
      </CardActions>
    </Card>
  )
}

export default TimeSeriesCard;