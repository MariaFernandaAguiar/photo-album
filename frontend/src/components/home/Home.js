// src/pages/Home.tsx
import { Accordion, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="mt-5">
      <Row className="text-center mb-4">
        <Col>
          <h1>Bem-vindo ao Photo Album</h1>
          <p className="text-muted">
            Explore uma galeria com imagens aleatórias, de qualidade e
            gratuitas.
          </p>
          <Link to="/galeria">
            <Button variant="primary">Ir para Galeria</Button>
          </Link>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body style={{ minHeight: "130px", marginBottom: "10px" }}>
              <Card.Title>🌍 Sobre o projeto</Card.Title>
              <Card.Text>
                Este projeto foi desenvolvido em React como parte de um estudo
                sobre consumo de APIs públicas, gerenciamento de estado com
                Context API, e estilização com React-Bootstrap.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body style={{ minHeight: "130px", marginBottom: "10px" }}>
              <Card.Title>📸 Fonte das Imagens</Card.Title>
              <Card.Text>
                As imagens são fornecidas pela API pública do{" "}
                <a
                  href="https://picsum.photos/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lorem Picsum
                </a>
                , que oferece fotos aleatórias com metadados úteis.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>🧭 Como usar o site?</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Acesse a galeria clicando em "Ir para Galeria"</li>
                  <li>
                    Clique em qualquer imagem para ver detalhes como autor,
                    dimensões e download
                  </li>
                  <li>Use os botões para navegar entre páginas (paginação)</li>
                  <li>
                    Explore as informações extras da imagem fornecidas pela API
                    secundária
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>⚙️ Tecnologias utilizadas</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>ReactJS (Create React App)</li>
                  <li>Context API + useReducer + useCallback</li>
                  <li>AJAX com XMLHttpRequest</li>
                  <li>React-Router-DOM para rotas</li>
                  <li>React-Bootstrap para UI moderna</li>
                  <li>Dotenv para controle de URLs da API</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>📦 Código fonte</Accordion.Header>
              <Accordion.Body>
                O código deste projeto está disponível publicamente no GitHub.
                <br />
                Você pode acessar o repositório aqui:{" "}
                <a
                  href="https://github.com/MariaFernandaAguiar/photo-album"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/MariaFernandaAguiar/photo-album
                </a>
                <br />
                Sinta-se à vontade para clonar, estudar e contribuir!
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
