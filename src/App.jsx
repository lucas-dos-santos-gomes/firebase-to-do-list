import Routers from "./config/Routers";
import { ThemeProvider } from "./contexts/theme";

export default function App() {
  return (
    <ThemeProvider>
      <Routers />
    </ThemeProvider>
  );
}
