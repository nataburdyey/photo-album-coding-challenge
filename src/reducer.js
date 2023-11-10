import { SET_PHOTOS, ALBUM_ADD_ITEM, ALBUM_REMOVE_ITEM, CLEAR_ALBUM } from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return { ...state, photos: action.payload };

    case CLEAR_ALBUM:
      return { ...state, album: new Map() };

    case ALBUM_REMOVE_ITEM: {
      const newAlbum = new Map(state.album);
      newAlbum.delete(action.payload.id);
      return { ...state, album: newAlbum };
    }

    case ALBUM_ADD_ITEM: {
      const newAlbum = new Map(state.album);
      newAlbum.set(action.payload.id, action.payload);
      return { ...state, album: newAlbum };
    }

    default:
      throw new Error(`No matching action type: ${action.type}`);
  }
};

export default reducer;
