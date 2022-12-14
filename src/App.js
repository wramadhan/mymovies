import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesProvider";
import DetailMovie from "./pages/DetailMovie";
import Favourite from "./pages/Favourite";
import Hiring from "./pages/Hiring";
import Homepage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";
import Settings from "./pages/Settings";
import "@fontsource/poppins"; // Defaults to weight 400.

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/detail/:id" element={<DetailMovie />} />
          <Route path="/search/:id" element={<SearchResults />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/hiring" element={<Hiring />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
