import { Box, Typography, Card, CardContent, TextField } from "@mui/material";
import { Link } from "react-router";

export default function TimeSeriesDetailsChat() {
    return (
        <>
            <Box
                sx={{
                    textAlign: 'center',
                    bgcolor: 'primary.main',
                    color: 'white',
                    padding: 2
                }}
            >
                <Typography variant="h6">Chat about stocks</Typography>
            </Box>
            <Card>
                <CardContent>
                    <div>
                        <form>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={2}
                                placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                            />
                        </form>
                    </div>

                    <Box>
                        <Box sx={{ display: 'flex', my: 2 }}>
                            <Box display='flex' flexDirection='column'>
                                <Box display='flex' alignItems='center' gap={3}>
                                    <Typography component={Link} to={`/profiles/username`} variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'none' }}>
                                        Alex
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        2 hours ago
                                    </Typography>
                                </Box>

                                <Typography sx={{ whiteSpace: 'pre-wrap' }}>Comment goes here</Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}
