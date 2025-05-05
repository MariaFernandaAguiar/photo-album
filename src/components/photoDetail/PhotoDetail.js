import { useEffect } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { usePhotos } from "../../contexts/PhotoContext";

const PhotoDetails = () => {
  const { id } = useParams();
  const { currentImage, getImageDetails, loading } = usePhotos();

  useEffect(() => {
    if (id) {
      getImageDetails(id);
    }
  }, [id, getImageDetails]);

  if (loading || !currentImage) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Carregando detalhes da imagem...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Image src={currentImage?.download_url} fluid rounded />
          <div className="mt-3">
            <Button
              href={currentImage?.download_url}
              target="_blank"
              rel="noopener noreferrer"
              variant="success"
            >
              Baixar Imagem
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <h3>Detalhes da Imagem</h3>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>ID:</strong> {currentImage?.id}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Autor:</strong> {currentImage?.author}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Dimensões:</strong> {currentImage?.width} x{" "}
              {currentImage?.height}
            </ListGroup.Item>
            <ListGroup.Item>
              <a
                href={currentImage?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver no site original
              </a>
            </ListGroup.Item>
          </ListGroup>

          {currentImage?.extraInfo && (
            <Accordion defaultActiveKey="0" className="mt-4">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Informações Extras</Accordion.Header>
                <Accordion.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>ID Extra:</strong> {currentImage?.extraInfo.id}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Autor:</strong> {currentImage?.extraInfo.author}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Dimensões:</strong>{" "}
                      {currentImage?.extraInfo.width} x{" "}
                      {currentImage?.extraInfo.height}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <a
                        href={currentImage?.extraInfo.download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver imagem extra
                      </a>
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PhotoDetails;
