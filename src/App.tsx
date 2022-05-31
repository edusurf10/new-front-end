import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { DarkTheme } from "./shared/themes";

export const App = () => {
  return (
    <ThemeProvider
      theme={DarkTheme}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}