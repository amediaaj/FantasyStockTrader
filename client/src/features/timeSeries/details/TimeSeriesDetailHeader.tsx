import { Typography, Divider, Grid2, Paper, Box } from "@mui/material";
import TimeSeriesChart from "../chart/TimeSeriesChart";
import { TimeSeries } from "../../../lib/types";

type Props = {
    timeSeries: TimeSeries | undefined
}

export default function TimeSeriesDetailsHeader({timeSeries}: Props) {    
    return (
        <Paper sx={{ mb: 2 }}>
            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={4}>
                    <Typography>Time</Typography>
                </Grid2>
                <Grid2 size={4}>
                    <Typography>Indicator</Typography>
                </Grid2>
            </Grid2>
            <Divider />

            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={12}>
                    {timeSeries ? <TimeSeriesChart timeseriesDaily={timeSeries["Time Series (Daily)"]} /> : <Box width='100%' height='200px'></Box>}
                </Grid2>
            </Grid2>
    </Paper>
    )
}