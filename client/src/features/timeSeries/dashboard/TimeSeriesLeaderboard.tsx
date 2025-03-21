import { Paper, Typography, List, ListItem, ListItemText, Grid2 } from "@mui/material";

export default function TimeSeriesLeaderboard() {
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
                    Leaderboard: 9 People Playing
                </Typography>
            </Paper>
            <Paper sx={{ padding: 2 }}>
                <Grid2 container alignItems="center">
                    <Grid2 size={12}>
                        <List sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ListItem>
                                <ListItemText style={{display:'flex', justifyContent: 'flex-start', paddingLeft: '20px'}}>
                                    <Typography variant="h6">1. Cassidy</Typography>
                                    <Typography variant="h6">2. Janet</Typography>
                                    <Typography variant="h6">3. Trevor</Typography>
                                    <Typography variant="h6">4. Dave</Typography>
                                    <Typography variant="h6">5. Alex</Typography>
                                    <Typography variant="h6">6. Bill</Typography>
                                    <Typography variant="h6">7. Chris</Typography>
                                    <Typography variant="h6">8. Monica</Typography>
                                    <Typography variant="h6">9. Cletus</Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid2>
                </Grid2>
            </Paper>
        </>
    );
}
