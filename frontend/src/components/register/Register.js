import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "./Register.css"; // Reaproveitando o estilo
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post(
        `${process.env.REACT_APP_API_URL}/login/register`,
        {
          login_email: email,
          login_password: password,
          login_name: name,
          login_photo_url: photoUrl,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erro no cadastro: ${errorData.error || "Tente novamente."}`);
        return;
      }

      alert("Cadastro realizado com sucesso!");
      navigate('/')
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Card.Title className="login-title">
          <h2>Criar Conta</h2>
        </Card.Title>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="login-label">Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="login-label">E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="login-label">Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhotoUrl">
            <Form.Label className="login-label">Foto (URL)</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL da sua foto (opcional)"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </Form.Group>

          <div className="login-button-container">
            <Button
              variant="primary"
              type="submit"
              disabled={!email || !password || !name}
              className="login-button"
            >
              Cadastrar
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
