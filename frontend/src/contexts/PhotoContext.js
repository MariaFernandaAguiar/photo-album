import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import api from "../services/api"; // ajuste o path se necessário

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
        photos: [
          ...state?.photos?.filter(
            (p) => !action.payload.find((a) => a.id === p.id)
          ),
          ...action.payload,
        ],
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

  const listPhotos = useCallback(async (page = 1, limit = 12) => {
    dispatch({ type: PhotoActionTypes.SET_LOADING, payload: true });

    try {
      const loginId = localStorage.getItem("loginId");
      const { data } = await api.get("/photos", {
        params: { loginId, page, limit },
      });

      dispatch({ type: PhotoActionTypes.ADD_PHOTOS, payload: data });
    } catch (error) {
      console.error("Erro ao buscar fotos:", error);
    } finally {
      dispatch({ type: PhotoActionTypes.SET_LOADING, payload: false });
    }
  }, []);

  const getImageDetails = useCallback(async (id) => {
    dispatch({ type: PhotoActionTypes.SET_LOADING, payload: true });

    try {
      const { data } = await api.get(`/photos/${id}`);
      dispatch({
        type: PhotoActionTypes.SET_CURRENT_IMAGE,
        payload: data,
      });
    } catch (error) {
      console.error("Erro ao buscar detalhes da imagem:", error);
    } finally {
      dispatch({ type: PhotoActionTypes.SET_LOADING, payload: false });
    }
  }, []);

  const addPhoto = useCallback(async (photoData) => {
    dispatch({ type: PhotoActionTypes.SET_LOADING, payload: true });

    try {
      const loginId = localStorage.getItem("loginId");
      const { data } = await api.post("/photos", {
        post_photo_url: photoData.post_photo_url,
        post_caption: photoData.post_caption,
        login_id: loginId,
      });

      listPhotos();
    } catch (error) {
      console.error("Erro ao adicionar foto:", error);
    } finally {
      dispatch({ type: PhotoActionTypes.SET_LOADING, payload: false });
    }
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      listPhotos,
      getImageDetails,
      addPhoto,
      dispatch,
    }),
    [state, listPhotos, getImageDetails, addPhoto]
  );

  return (
    <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>
  );
};

export const usePhotos = () => useContext(PhotoContext);
