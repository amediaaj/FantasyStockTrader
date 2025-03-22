import { Grid2 } from "@mui/material";
import { useParams } from "react-router";
import TimeSeriesDetailHeader from "../timeSeries/details/TimeSeriesDetailHeader";
import TimeSeriesDetailInfo from "../timeSeries/details/TimeSeriesDetailInfo";
import TimeSeriesDetailSidebar from "../timeSeries/details/TimeSeriesDetailSidebar";
import { useTimeSeries } from "../../lib/hooks/useTimeSeries";
import { useStore } from "../../lib/hooks/useStore";

const TimeSeriesTrade = () => {
    const {ticker} = useParams();
    const { uiStore } = useStore();
    uiStore.setTicker(ticker);
    const {timeSeries} = useTimeSeries(ticker);

    return (
        <Grid2 container spacing={5}>
            <Grid2 size={8}>
                <TimeSeriesDetailHeader timeSeries={timeSeries} />
                <TimeSeriesDetailInfo />
            </Grid2>
            <Grid2 size={4}>
                <TimeSeriesDetailSidebar />
            </Grid2>
        </Grid2>
  )
}

export default TimeSeriesTrade;