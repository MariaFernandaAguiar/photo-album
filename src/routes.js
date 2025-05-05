import { Route, Routes } from "react-router-dom";
import Galeria from "./components/gallery/Gallery";
import Home from "./components/home/Home";
import NotFound from "./components/notFound/NotFound";
import PhotoDetail from "./components/photoDetail/PhotoDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/detalhes/:id" element={<PhotoDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
