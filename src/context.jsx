import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from 'react';

import reducer from './reducer';
import {
  SET_PHOTOS,
  ALBUM_ADD_ITEM,
  ALBUM_REMOVE_ITEM,
  CLEAR_ALBUM,
} from './actions';

const AppContext = createContext();

const initialState = {
  loading: false,
  photos: [],
  album: new Map(),
};

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches;
  const storedDarkMode = localStorage.getItem('darkTheme') === 'true';
  return storedDarkMode || prefersDarkMode;
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());

  const setPhotos = (photos) => {
    dispatch({ type: SET_PHOTOS, payload: photos });
  };

  const albumAddItem = (photo) => {
    dispatch({ type: ALBUM_ADD_ITEM, payload: photo });
  };

  const albumRemoveItem = (id) => {
    dispatch({ type: ALBUM_REMOVE_ITEM, payload: { id } });
  };

  const clearAlbum = () => {
    dispatch({ type: CLEAR_ALBUM });
  };

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setPhotos,
        albumAddItem,
        albumRemoveItem,
        clearAlbum,
        isDarkTheme,
        toggleDarkTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
