import { Group } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, 
    Container, MenuItem } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar 
            elevation={11} 
            position="static" 
            sx={{
                backgroundImage: 
                    'linear-gradient(90deg, rgba(51,50,57,1) 0%, rgba(83,140,71,1) 35%, rgba(125,184,155,1) 100%)'}}>
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
                    <MenuItem>
                        User Menu
                    </MenuItem>
                </Toolbar>
            </Container>
          </AppBar>
        </Box>
    );
}

export default NavBar;