import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";
import { ColorModeContext, useMode } from "../../theme";
import { Theme } from "@emotion/react";


function App() {
  const [theme, colorMode] = useMode();
  
  return (
    <ColorModeContext.Provider value={colorMode as { toggleColorMode: () => void; }}>
      <ThemeProvider theme={theme as Theme}>
        <Box sx={{minHeight:'100vh'}}>
          <CssBaseline />
          <NavBar />
          <Container maxWidth='xl' sx={{mt: 3}}>
            <Outlet />
          </Container>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
