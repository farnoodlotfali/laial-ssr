import {
  GET_MENU,
  CHANGE_RIGHT,
  CHANGE_LEFT,
  CHANGE_CENTER,
  CHANGE_SHOW_MUSIC,
} from './types';

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
      };
    case CHANGE_SHOW_MUSIC:
      return {
        ...state,
        showMusic: action.payload,
      };
    default:
      return { ...state };
  }
};

export default reducer;
