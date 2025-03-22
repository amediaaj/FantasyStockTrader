import { Divider, Grid2, Paper, Typography } from "@mui/material";

export default function TimeSeriesDetailInfo() {
    return (
        <Paper sx={{ mb: 2 }}>
            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={12}>
                    <Typography>History</Typography>
                </Grid2>
            </Grid2>
            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={3}>
                    <Typography>Date</Typography>
                </Grid2>
                <Grid2 size={3}>
                    <Typography>Trade</Typography>
                </Grid2>
                <Grid2 size={3}>
                    <Typography>Pric</Typography>
                </Grid2>
                <Grid2 size={3}>
                    <Typography>Value</Typography>
                </Grid2>
            </Grid2>
            <Divider />
            <Grid2 container alignItems="center" pl={2} py={1}>
            <Grid2 size={3}>
                    <Typography>Lorem Ipsum</Typography>
                </Grid2>
                <Grid2 size={3}>
                    <Typography>Lorem Ipsum</Typography>
                </Grid2>
                <Grid2 size={3}>
                    <Typography>Lorem Ipsum</Typography>
                </Grid2>
                <Grid2 size={3}>
                    <Typography>Lorem Ipsum</Typography>
                </Grid2>
            </Grid2>
            <Divider />
            <Grid2 container alignItems="center" pl={2} py={1}>
            <Grid2 size={3}>
                    <Typography>Lorem Ipsum</Typography>
                </Grid2>
                <Grid2 size={3}>
                    <Typography>Lorem Ipsum</Typography>
                </Grid2>
                <Grid2 size={3}>
                    <Typography>Lorem Ipsum</Typography>
                </Grid2>
                <Grid2 size={3}>
                    <Typography>Lorem Ipsum</Typography>
                </Grid2>
            </Grid2>
        </Paper>
    )
}
