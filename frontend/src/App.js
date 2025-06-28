import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const isAuthPage = location.pathname === "/login" || location.pathname === "/cadastro";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <>
      {token && !isAuthPage && (
        <Navbar style={{ height: "100px" }} bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              PhotoAlbum
            </Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/galeria">
                Galeria
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>Sair</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      )}

      <Container style={{ padding: "40px" }} className="mt-4">
        <AppRoutes />
      </Container>
    </>
  );
}

export default App;
