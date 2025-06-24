import { useEffect } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usePhotos } from "../../contexts/PhotoContext";

export default function Galeria() {
  const { photos, loading, listPhotos, page, hasMore } = usePhotos();

  useEffect(() => {
    if (photos?.length === 0) {
      listPhotos(1);
    }
  }, []);

  const handleLoadMore = () => {
    listPhotos(page + 1);
  };

  const getImageUrl = (id, width = 400, height = 300) =>
    `https://picsum.photos/id/${id}/${width}/${height}`;

  return (
    <>
      <h1>Galeria de Fotos</h1>
      <Row>
        {photos?.map((photo, index) => (
          <Col md={4} key={`${photo.id}-${index}`} className="mb-4">
            <Link
              style={{ textDecoration: "none" }}
              to={`/detalhes/${photo.id}`}
              key={`${photo.id}-${index}`}
            >
              <Card>
                <Card.Img variant="top" src={getImageUrl(photo.id)} />
                <Card.Body>
                  <Card.Title>{photo.author}</Card.Title>
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
