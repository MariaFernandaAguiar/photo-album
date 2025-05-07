import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

const PhotoActionTypes = {
  SET_LOADING: "SET_LOADING",
  ADD_PHOTOS: "ADD_PHOTOS",
  RESET_PHOTOS: "RESET_PHOTOS",
  SET_CURRENT_IMAGE: "SET_CURRENT_IMAGE",
};

const PhotoContext = createContext({});

const initialState = {
  loading: false,
  photos: [],
  page: 1,
  hasMore: true,
  currentImage: null,
};

function photoReducer(state, action) {
  switch (action.type) {
    case PhotoActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case PhotoActionTypes.ADD_PHOTOS:
      return {
        ...state,
        photos: [...state.photos, ...action.payload],
        page: state.page + 1,
        hasMore: action.payload.length > 0,
      };
    case PhotoActionTypes.RESET_PHOTOS:
      return { ...state, photos: [], page: 1, hasMore: true };
    case PhotoActionTypes.SET_CURRENT_IMAGE:
      return { ...state, currentImage: action.payload };
    default:
      return state;
  }
}

export const PhotoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(photoReducer, initialState);

  const listPhotos = useCallback((page = 1, limit = 12) => {
    dispatch({ type: PhotoActionTypes.SET_LOADING, payload: true });

    const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        dispatch({ type: PhotoActionTypes.SET_LOADING, payload: false });

        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          dispatch({ type: PhotoActionTypes.ADD_PHOTOS, payload: data });
        } else {
          console.error("Erro ao buscar fotos");
        }
      }
    };
    xhr.send();
  }, []);

  const getImageDetails = useCallback((id) => {
    dispatch({ type: PhotoActionTypes.SET_LOADING, payload: true });

    const apiUrl = `https://picsum.photos/id/${id}/info`;
    const infoUrl = `https://picsum.photos/seed/picsum/info`;

    const xhrMain = new XMLHttpRequest();
    xhrMain.open("GET", apiUrl);
    xhrMain.onreadystatechange = () => {
      if (xhrMain.readyState === 4) {
        if (xhrMain.status === 200) {
          const mainData = JSON.parse(xhrMain.responseText);

          const xhrExtra = new XMLHttpRequest();
          xhrExtra.open("GET", infoUrl);
          xhrExtra.onreadystatechange = () => {
            if (xhrExtra.readyState === 4) {
              dispatch({ type: PhotoActionTypes.SET_LOADING, payload: false });

              if (xhrExtra.status === 200) {
                const extraData = JSON.parse(xhrExtra.responseText);

                const combinedData = {
                  ...mainData,
                  extraInfo: extraData,
                };

                dispatch({
                  type: PhotoActionTypes.SET_CURRENT_IMAGE,
                  payload: combinedData,
                });
              } else {
                console.warn(
                  "Dados extras não carregados, usando apenas dados principais"
                );
                dispatch({
                  type: PhotoActionTypes.SET_CURRENT_IMAGE,
                  payload: mainData,
                });
              }
            }
          };
          xhrExtra.send();
        } else {
          console.error("Erro ao buscar imagem detalhada");
          dispatch({ type: PhotoActionTypes.SET_LOADING, payload: false });
        }
      }
    };
    xhrMain.send();
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      listPhotos,
      getImageDetails,
      dispatch,
    }),
    [state, listPhotos, getImageDetails]
  );

  return (
    <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>
  );
};

export const usePhotos = () => useContext(PhotoContext);
