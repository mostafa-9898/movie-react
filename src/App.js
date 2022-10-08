import { Navigate, Route, Routes } from "react-router-dom";

//mui
import { Paper } from "@mui/material";

// context
import { ColorContextProvider } from "./context/theme/MUI_MODE";

// components
import Navbar from "./components/Navbar";
import Movie from "./pages/Movie";
import Tv from "./pages/Tv"
import Details from "./pages/Details";

function App() {
  document.title = "Movie"
  return (
    <ColorContextProvider>
      <Paper variant="elevation" elevation={4}
        sx={{ border: 'none', borderRadius: '0', boxShadow: 'none' }}
      >
        <Navbar />
        <Routes>
          <Route path="/movie" element={<Movie />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/" element={<Navigate to='/movie' />} />
          <Route path="/movie/:id" element={<Details />} />
          <Route path="/tv/:id" element={<Details />} />
        </Routes>
      </Paper>
    </ColorContextProvider>
  );
}

export default App;
