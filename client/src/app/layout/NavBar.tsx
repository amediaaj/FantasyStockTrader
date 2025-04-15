import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  MenuItem,
  useTheme,
  LinearProgress,
} from '@mui/material';
import { NavLink } from 'react-router';
import MenuItemLink from '../shared/components/MenuItemLink';
import { tokens } from '../../lib/themes/theme';
import { useStore } from '../../lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';
import { useAccount } from '../../lib/hooks/useAccount';
import UserMenu from './UserMenu';

const NavBar = () => {
  const { uiStore } = useStore();
  const { currentUser } = useAccount();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: colors.primary[900] }} position="relative">
        <Container>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <MenuItem
                component={NavLink}
                to="/"
                sx={{ display: 'flex', gap: 2 }}
              >
                <Typography variant="h4" fontWeight={'bold'}>
                  FantasyStockTrader.com
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <MenuItemLink to="/timeseries">My Stocks</MenuItemLink>
              {import.meta.env.DEV && (
                <Box sx={{ display: 'flex', border: 'red 2px dotted' }}>
                  <MenuItemLink to="/counter">Ctr</MenuItemLink>
                  <MenuItemLink to="/errors">Err</MenuItemLink>
                </Box>
              )}
            </Box>
            <Box display="flex" alignItems="center">
              {currentUser ? (
                <UserMenu />
              ) : (
                <>
                  <MenuItemLink to="/login">Login</MenuItemLink>
                  <MenuItemLink to="/regitst">Register</MenuItemLink>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
        <Observer>
          {() =>
            uiStore.isLoading ? (
              <LinearProgress
                color="secondary"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                }}
              />
            ) : null
          }
        </Observer>
      </AppBar>
    </Box>
  );
};

export default NavBar;
