import axios from "axios";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          loginEmail: email,
          loginPassword: password,
        }
      );

      const { accessToken, loginName } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("loginName", loginName);

      navigate("/galeria");
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.error || "Erro no login");
      } else {
        setErrorMsg("Erro no servidor");
      }
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Card.Title className="login-title">
          <h2>Login</h2>
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="login-label">E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="login-label">Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="login-button-container">
            <Button
              variant="primary"
              type="submit"
              disabled={!email || !password}
              className="login-button"
            >
              Entrar
            </Button>
          </div>

          <div style={{ marginTop: "20px" }} className="text-center">
            <Link to="/cadastro" className="login-link">
              Criar nova conta
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
