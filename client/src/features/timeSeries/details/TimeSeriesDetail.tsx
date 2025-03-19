import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { TimeSeries } from "../../../lib/types";
import { Link, useNavigate, useParams } from "react-router";
import { useTimeSeries } from "../../../lib/hooks/useTimeSeries";

const TimeSeriesDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {timeSeries, isLoadingTimeSeries} = useTimeSeries(id);

    if (isLoadingTimeSeries) return <Typography>Loading...</Typography>
    
    if(!timeSeries) return <Typography>Time series not found</Typography>

    return (
        <Card sx={{borderRadius: 3}}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={timeSeries.tickerSymbol}
                subheader={timeSeries.id}
            />
            <CardMedia
                component="img"
                sx={{ display: "flex", maxWidth: 125, marginLeft: '9px'}} 
                height="125"
                src={`https://eodhd.com/img/logos/US/${timeSeries.tickerSymbol}.png`}
                >
            </CardMedia>
            <CardContent>
                <Typography>Content goes here...</Typography>
            </CardContent>
            <Button component={Link} to={`/trade/${timeSeries.id}`} color='primary'>Edit</Button>
            <Button onClick={() => navigate('/timeSeries')} color='inherit'>Cancel</Button>
        </Card>
  )
}

export default TimeSeriesDetail;