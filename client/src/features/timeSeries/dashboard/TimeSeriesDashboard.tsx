import { Grid2 } from "@mui/material";
import TimeSeriesList from "./TimeSeriesList";

const TimeSeriesDashboard = () => {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <TimeSeriesList />
            </Grid2>
            <Grid2 size={5}>
                Timeseries filters go here
            </Grid2>
        </Grid2>
    );
}

export default TimeSeriesDashboard;