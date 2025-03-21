import { Grid2, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useTimeSeries } from "../../../lib/hooks/useTimeSeries";
import TimeSeriesDetailHeader from "./TimeSeriesDetailHeader";
import TimeSeriesDetailInfo from "./TimeSeriesDetailInfo";
import TimeSeriesDetailSidebar from "./TimeSeriesDetailSidebar";

const TimeSeriesDetail = () => {
    const {id} = useParams();
    const {timeSeries, isLoadingTimeSeries} = useTimeSeries(id);

    if (isLoadingTimeSeries) return <Typography>Loading...</Typography>
    
    if(!timeSeries) return <Typography>Time series not found</Typography>

    return (
        <Grid2 container spacing={5}>
            <Grid2 size={8}>
                <TimeSeriesDetailHeader />
                <TimeSeriesDetailInfo />
            </Grid2>
            <Grid2 size={4}>
                <TimeSeriesDetailSidebar />
            </Grid2>
        </Grid2>
  )
}

export default TimeSeriesDetail;