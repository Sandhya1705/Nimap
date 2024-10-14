import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./pages/home/home";
import TopRated from "./pages/topRated/topRated";
import Upcoming from "./pages/upcoming/upcoming";
import Search from "./pages/search/search";
import MovieDetails from "./pages/movieDetails/movieDetails";

function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
