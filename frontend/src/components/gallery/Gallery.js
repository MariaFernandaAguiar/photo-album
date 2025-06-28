import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usePhotos } from "../../contexts/PhotoContext";

export default function Galeria() {
  const { photos, loading, listPhotos, page, hasMore, addPhoto } = usePhotos();
  const [caption, setCaption] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (photos?.length === 0) {
      listPhotos(1);
    }
  }, []);

  const handleLoadMore = () => {
    listPhotos(page + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photoUrl.trim()) return;
    await addPhoto({ post_photo_url: photoUrl, post_caption: caption });
    setPhotoUrl("");
    setCaption("");
  };

  return (
    <>
      <h1>Galeria de Fotos</h1>

      <Form className="mb-4" onSubmit={handleSubmit}>
        <Row>
          <Col md={5}>
            <Form.Control
              placeholder="URL da Imagem"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              required
            />
          </Col>
          <Col md={5}>
            <Form.Control
              placeholder="Legenda (opcional)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button type="submit" className="w-100">
              Adicionar
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {photos?.map((photo, index) => (
          <Col md={4} key={`${photo.post_id}-${index}`} className="mb-4">
            <Link
              style={{ textDecoration: "none" }}
              to={`/detalhes/${photo.post_id}`}
            >
              <Card>
                <Card.Img variant="top" src={photo.post_photo_url} />
                <Card.Body>
                  <Card.Title>{photo.post_caption || "Sem legenda"}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {loading && <Spinner animation="border" className="d-block mx-auto" />}

      {hasMore && !loading && (
        <div className="text-center mt-3">
          <Button onClick={handleLoadMore}>Carregar mais</Button>
        </div>
      )}
    </>
  );
}
