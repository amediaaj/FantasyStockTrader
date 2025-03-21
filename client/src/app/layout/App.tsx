import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router";
import { ColorModeContext, useMode } from "../../lib/themes/theme";
import { Theme } from "@emotion/react";
import HomePage from "../../features/home/HomePage";


function App() {
  const location = useLocation();
  const [theme, colorMode] = useMode();
  
  return (
    <ColorModeContext.Provider value={colorMode as { toggleColorMode: () => void; }}>
      <ThemeProvider theme={theme as Theme}>
        <Box sx={{minHeight:'100vh'}}>
          <CssBaseline />
          {location.pathname === '/' ? <HomePage /> : (
            <>
              <NavBar />
              <Container maxWidth='xl' sx={{mt: 3}}>
                <Outlet />
              </Container>
            </>
          )}
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
