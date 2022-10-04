import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesProvider";
import DetailMovie from "./pages/DetailMovie";
import Favourite from "./pages/Favourite";
import Hiring from "./pages/Hiring";
import Homepage from "./pages/HomePage";
import SearchResults from "./pages/SearchResults";
import Settings from "./pages/Settings";

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
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
