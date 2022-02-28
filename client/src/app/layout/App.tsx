import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Catalog from "../../feature/catalog/Catalog";
import Header from "./header";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChanged() {
    setDarkMode(!darkMode);
  }
  return (
    <ThemeProvider theme={theme}> 
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChanged={handleThemeChanged} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
