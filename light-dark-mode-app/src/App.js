import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import "./styles.css";
import Navbar from "./components/navbar";
import ThemeProvider from "./theme-context";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Navabar */}
        <Navbar />
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
