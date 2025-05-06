import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <Navbar style={{ height: "100px" }} bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            PhotoAlbum
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/galeria">
              Galeria
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container style={{ padding: "40px" }} className="mt-4">
        <AppRoutes />
      </Container>
    </>
  );
}

export default App;
