import { useEffect, useReducer, useState } from 'react';
import AppContext from './appContext';
import appReducer from './appReducer';
import {
  GET_MENU,
  CHANGE_RIGHT,
  CHANGE_LEFT,
  CHANGE_CENTER,
  CHANGE_SHOW_MUSIC,
} from './types';
const AppState = (props) => {
  const initialState = {
    home: null,
    menu: null,
    RightList: false,
    leftList: false,
    centerList: false,
    showMusic: false,
  };
  useEffect(() => {
    getMenu();
  }, []);
  const [state, dispatch] = useReducer(appReducer, initialState);
  const getMenu = async () => {
    try {
      const res = await fetch(`http://laial.7negare.ir/api/menu/`);
      const resData = await res.json();
      // console.log(resData);
      dispatch({
        type: GET_MENU,
        payload: resData.results,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const showRightList = (newValue) => {
    dispatch({
      type: CHANGE_RIGHT,
      payload: newValue,
    });
  };
  const showLeftList = (newValue) => {
    dispatch({
      type: CHANGE_LEFT,
      payload: newValue,
    });
  };
  const showCenterList = (newValue) => {
    dispatch({
      type: CHANGE_CENTER,
      payload: newValue,
    });
  };
  const ChangeShowMusic = (newValue) => {
    dispatch({
      type: CHANGE_SHOW_MUSIC,
      payload: newValue,
    });
  };
  return (
    <AppContext.Provider
      value={{
        getMenu,
        showRightList,
        showLeftList,
        showCenterList,
        ChangeShowMusic,
        showMusic: state.showMusic,
        menu: state.menu,
        RightList: state.RightList,
        leftList: state.leftList,
        centerList: state.centerList,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
