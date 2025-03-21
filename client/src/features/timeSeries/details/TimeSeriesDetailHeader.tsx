import { Card, Badge, CardMedia, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router";

export default function TimeSeriesDetailsHeader() {
    const isCancelled = false;
    
    return (
        <Card sx={{ position: 'relative', mb: 2, backgroundColor: 'transparent', overflow: 'hidden' }}>
        {isCancelled && (
            <Badge
                sx={{ position: 'absolute', left: 40, top: 20, zIndex: 1000 }}
                color="error"
                badgeContent="Cancelled"
            />
        )}
        <CardMedia
            component="img"
            height="300"
            image={'https://placehold.co/400?text=.png'}
            alt={'travel image'}
        />
        <Box sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            color: 'white',
            padding: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)',
            boxSizing: 'border-box',
        }}>       
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>TimeSeries title goes here</Typography>
                <Typography variant="subtitle1">1 Jan 2025 at 1:40pm</Typography>
                <Typography variant="subtitle2">
                    Lorem Ipsum <Link to={`/profiles/username`} style={{ color: 'white', fontWeight: 'bold' }}>Lorem Ipsum</Link>
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <>
                    <Button
                        variant='contained'
                        color={isCancelled ? 'success' : 'error'}
                        onClick={() => { }}
                    >
                       Lorem Ipsum
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/manage/TimeSeriesId`}
                        disabled={isCancelled}
                    >
                        Lorem Ipsum
                    </Button>
                </>
            </Box>
        </Box>
    </Card>
    )
}