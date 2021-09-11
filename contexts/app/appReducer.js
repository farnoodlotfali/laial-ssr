import {
  GET_MENU,
  CHANGE_RIGHT,
  CHANGE_LEFT,
  CHANGE_CENTER,
  CHANGE_SHOW_MUSIC,
  GET_USER_PLAYLISTS,
  FIND_MAIN_PLAYLIST,
  IS_ADDING_NEW_SONG_TO_PLAYLIST,
  SET_SONG_ID,
  GET_CONFIGS,
  REMOVE_LOADING_ON_USER_PLAYLIST,
  SET_LOADING_ON_USER_PLAYLIST,
  CHANGE_MY_PROFILE_MY_SONGLIST_ID,
  CHANGE_SHOW_CREATE_LIST,
  THIS_SONG_HAS_BEEN_ADD,
} from "./types";

const reducer = (state, action) => {
  switch (action.type) {
    case GET_MENU:
      return {
        ...state,
        menu: action.payload,
      };
    case CHANGE_RIGHT:
      return {
        ...state,
        RightList: action.payload,
      };
    case CHANGE_LEFT:
      return {
        ...state,
        leftList: action.payload,
      };
    case CHANGE_CENTER:
      return {
        ...state,
        centerList: action.payload,
        isAddingSong: false,
      };
    case CHANGE_SHOW_MUSIC:
      return {
        ...state,
        showMusic: action.payload,
      };
    case GET_USER_PLAYLISTS:
      return {
        ...state,
        userPlaylists: action.payload,
      };
    case FIND_MAIN_PLAYLIST:
      return {
        ...state,
        mainPlaylistId: action.payload,
      };
    case IS_ADDING_NEW_SONG_TO_PLAYLIST:
      return {
        ...state,
        isAddingSong: true,
      };
    case SET_SONG_ID:
      return {
        ...state,
        whichSongToSaveInPlaylist: action.payload,
      };

    case GET_CONFIGS:
      return {
        ...state,

        LimitListPlayNonLogin: JSON.parse(action.payload?.[0]?.value),
      };
    case SET_LOADING_ON_USER_PLAYLIST:
      return {
        ...state,
        loadingOnUserPlaylist: true,
      };
    case REMOVE_LOADING_ON_USER_PLAYLIST:
      return {
        ...state,
        loadingOnUserPlaylist: false,
      };
    case CHANGE_MY_PROFILE_MY_SONGLIST_ID:
      return {
        ...state,
        myProfilemySonglistId: action.payload,
      };
    case CHANGE_SHOW_CREATE_LIST:
      return {
        ...state,
        showCreateList: action.payload,
      };
    case THIS_SONG_HAS_BEEN_ADD:
      return {
        ...state,
        thisSongHasBeenAddedToRecentlyViwed: true,
      };
    default:
      return { ...state };
  }
};

export default reducer;
