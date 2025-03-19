import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { TimeSeries } from "../../../lib/types";
import { useTimeSeries } from "../../../lib/hooks/useTimeSeries";
import { Link } from "react-router";

type Props = {
    timeSeries: TimeSeries
}

const TimeSeriesCard = ({ timeSeries }: Props) => {
  const {deleteUserTimeSeries} = useTimeSeries();

  return (
    <Card sx={{borderRadius: 3}}>
        <CardContent>
            <Typography variant='h5'>{timeSeries["Meta Data"]["2. Symbol"]}</Typography>
            <Typography sx={{color: 'text.secondary', mb: 1}}>{timeSeries["Meta Data"]["3. Last Refreshed"]}</Typography>
            <Typography variant='body2'>{timeSeries["Meta Data"]["5. Time Zone"]}</Typography>
            <Typography variant='subtitle1'>{timeSeries.id}</Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent:'space-between', pb:2}}>
            <Chip label={timeSeries["Meta Data"]["4. Output Size"]} />
            <Box display={'flex'} gap={3}>
              <Button 
                component={Link}
                to={`/timeSeries/${timeSeries.id}`}
                size='medium'
                variant="contained"
                color='inherit'
              >
                View
              </Button>
              <Button 
                onClick={() => deleteUserTimeSeries.mutate(timeSeries.id)} 
                size='medium' 
                variant='contained' 
                color="inherit"
              >
                Delete
              </Button>
            </Box>
        </CardActions>
    </Card>
  )
}

export default TimeSeriesCard;