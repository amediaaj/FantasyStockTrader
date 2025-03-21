import { Group } from "@mui/icons-material";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import { Link } from "react-router";
import { tokens } from "../../lib/themes/theme";

export default function HomePage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)

  return (
    <Paper 
      sx={{
        backgroundColor: 'background',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100vh',
        border: `3px dotted ${colors.primary[100]}`
      }}
    >
      <Box 
        color={colors.primary[100]}
        sx={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          gap: 3
        }}>
          <Group sx={{height: 110, width: 110}}/>
          <Typography variant='h1'>
            FantasyStockTrader.com
          </Typography>
      </Box>
      <Typography variant='h2' color={colors.primary[100]}>
        Welcome
      </Typography>
      {theme.palette.mode === 'dark' ?
      <Button
        component={Link}
        to='/timeseries'
        size='large'
        variant='text'
        sx={{height: 80, borderRadius: 4, fontSize: '1.5rem', color: `${colors.primary[100]}`, border: `2px dotted ${colors.primary[100]}` }}
      >
        Take me to the stocks!
      </Button> :
      <Button
        component={Link}
        to='/timeseries'
        size='large'
        variant='outlined'
        color="primary"
        sx={{height: 80, borderRadius: 4, fontSize: '1.5rem'}}
      >
        Take me to the stocks!
      </Button>}
    </Paper>
  )
}