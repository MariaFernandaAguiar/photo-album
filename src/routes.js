import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Gallery from "./components/gallery/Gallery";
import PhotoDetail from "./components/photoDetail/PhotoDetail";
import NotFound from "./components/notFound/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/photo/:id" element={<PhotoDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
