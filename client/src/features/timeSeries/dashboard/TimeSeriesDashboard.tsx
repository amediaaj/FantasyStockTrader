import { Grid2 } from "@mui/material";
import TimeSeriesList from "./TimeSeriesList";
import TimeSeriesLeaderboard from "./TimeSeriesLeaderboard";
import TimeSeriesChat from "./TimeSeriesChat";

const TimeSeriesDashboard = () => {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <TimeSeriesList />
            </Grid2>
            <Grid2 size={5}>
                <TimeSeriesLeaderboard />
                <TimeSeriesChat />
            </Grid2>
        </Grid2>
    );
}

export default TimeSeriesDashboard;