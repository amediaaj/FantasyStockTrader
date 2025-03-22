import { Add, Remove } from '@mui/icons-material';
import { Paper, Typography, Grid2, Box, Slider, Stack, Button } from "@mui/material";
import TickerSearch from '../../form/TickerSearch';
import { useStore } from '../../../lib/hooks/useStore';


export default function TimeSeriesDetailSidebar() {
const { uiStore } = useStore();

    return (
        <>
            <Paper
                sx={{
                    textAlign: 'center',
                    border: 'none',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    p: 2,
                }}
            >
                <Typography variant="h6">
                    Trade
                </Typography>
            </Paper>
            <Paper sx={{ padding: 2 }}>
                <Grid2 container alignItems="center" columnSpacing={2}>
                    <Grid2 size={12}>
                        < Box>
                            <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                                <Remove />
                                    <Slider disabled aria-label="Volume" value={30} onChange={() => {}} />
                                <Add />
                            </Stack>
                        </Box>
                    </Grid2>
                    <Grid2 size={6}>
                        <Button variant='outlined' color='success' fullWidth>Buy</Button>
                    </Grid2>
                    <Grid2 size={6}>
                        <Button variant='outlined' color='error' fullWidth>Sell</Button>
                    </Grid2>
                </Grid2>
                <Grid2 container alignItems="center" mt={2}>
                    <Grid2 size={6}>
                        <Typography>USD: $25</Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography>Shares: 1.2</Typography>
                    </Grid2>
                </Grid2>
                <Grid2 container alignItems='center' mt={2}>
                    <Grid2 size={12}>
                        {!uiStore.ticker && <TickerSearch />}
                    </Grid2>
                </Grid2>
            </Paper>
        </>
    );
}
