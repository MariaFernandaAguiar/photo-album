import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const PhotoContext = createContext({});

export const PhotoProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentImage, setCurrentImage] = useState(null);

  const listPhotos = useCallback((newPage = 1, limit = 12) => {
    setLoading(true);

    const apiUrl = `${process.env.REACT_APP_PHOTOS_API}?page=${newPage}&limit=${limit}`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        setLoading(false);
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          if (data.length === 0) setHasMore(false);
          setPhotos((prev) => [...prev, ...data]);
          setPage(newPage);
        } else {
          console.error("Erro ao buscar fotos");
        }
      }
    };
    xhr.send();
  }, []);

  const getImageDetails = useCallback((id) => {
    setLoading(true);

    const apiUrl = `${process.env.REACT_APP_PHOTOS_API}?id=${id}`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        setLoading(false);
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          if (Array.isArray(data) && data.length > 0) {
            setCurrentImage(data[0]);
          } else {
            setCurrentImage(null);
          }
        } else {
          console.error("Erro ao buscar detalhes");
        }
      }
    };
    xhr.send();
  }, []);

  const value = useMemo(
    () => ({
      loading,
      photos,
      page,
      hasMore,
      listPhotos,
      currentImage,
      setCurrentImage,
      getImageDetails,
    }),
    [loading, photos, page, hasMore, listPhotos, getImageDetails, currentImage]
  );

  return (
    <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>
  );
};

export const usePhotos = () => useContext(PhotoContext);
