import { Route, Routes, Navigate } from "react-router-dom";
import Galeria from "./components/gallery/Gallery";
import Home from "./components/home/Home";
import NotFound from "./components/notFound/NotFound";
import PhotoDetail from "./components/photoDetail/PhotoDetail";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" replace />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/galeria"
        element={
          <PrivateRoute>
            <Galeria />
          </PrivateRoute>
        }
      />
      <Route
        path="/detalhes/:id"
        element={
          <PrivateRoute>
            <PhotoDetail />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
