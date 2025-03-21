import { Paper, Typography, List, ListItem, ListItemText, Grid2, Box } from "@mui/material";

export default function TimeSeriesDetailSidebar() {
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
                    Sidebar
                </Typography>
            </Paper>
            <Paper sx={{ padding: 2 }}>
                <Grid2 container alignItems="center">
                    <Grid2 size={8}>
                        <List sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="h6">Lorem Ipsum</Typography>
                                </ListItemText>
                                <ListItemText>
                                    <Typography variant="h6">Tokens</Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid2>
                    <Grid2 size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                        <Box width='100%' border={'2px dotted white'}>
                                <Typography> Lorem Ipsum</Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            </Paper>
        </>
    );
}
