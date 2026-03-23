import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store.js";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Theme wrapper component
const ThemeWrapper = () => {
  const mode = useSelector((state) => state.theme.mode);

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeWrapper />
    </Provider>
  </StrictMode>
);