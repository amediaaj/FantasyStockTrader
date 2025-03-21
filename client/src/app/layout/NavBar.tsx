import { Group } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, 
    Container, MenuItem, 
    useTheme,
    IconButton} from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { ColorModeContext, tokens } from "../../lib/themes/theme";
import { useContext } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationAddOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"

const NavBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar 
            sx={{backgroundColor: colors.primary[900]}}
            elevation={11} 
            position="static"
            >
            <Container>
                <Toolbar sx={{
                    display: 'flex', 
                    justifyContent:'space-between'}}
                >
                    <Box>
                        <MenuItem 
                            component={NavLink} to='/' 
                            sx={{display: 'flex', gap:2}}>
                            <Group fontSize='large'/>
                            <Typography 
                                variant="h4" 
                                fontWeight={'bold'}
                            >
                                FantasyStockTrader.com
                            </Typography>
                        </MenuItem>
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        <MenuItemLink to='/timeSeries'>
                            My Stocks
                        </MenuItemLink>
                        <MenuItemLink to='/trade'>
                            Trade Stocks
                        </MenuItemLink>
                    </Box>
                    {/* icons */}
                    <Box display='flex'>
                        <IconButton onClick={colorMode.toggleColorMode}>
                            {theme.palette.mode === 'dark' ? (
                                    <DarkModeOutlinedIcon></DarkModeOutlinedIcon>
                                ) : (
                                    <LightModeOutlinedIcon></LightModeOutlinedIcon>
                            )}
                        </IconButton>

                        <IconButton>   
                            <NotificationsOutlinedIcon></NotificationsOutlinedIcon>
                        </IconButton>

                        <IconButton>
                            <SettingsOutlinedIcon></SettingsOutlinedIcon>
                        </IconButton>

                        <IconButton> 
                            <PersonOutlinedIcon></PersonOutlinedIcon>    
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
          </AppBar>
        </Box>
    );
}

export default NavBar;