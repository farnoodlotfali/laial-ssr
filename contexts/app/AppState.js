import { useEffect, useReducer, useState } from "react";
import AppContext from "./appContext";
import appReducer from "./appReducer";
import { fetchapi, login, logout } from "../../fetchapi/fetchApi";
import fetch from "isomorphic-unfetch";

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
} from "./types";
import { useRouter } from "next/router";
const AppState = (props) => {
  const router = useRouter();
  const initialState = {
    home: null,
    menu: null,
    userPlaylists: null,
    whichSongToSaveInPlaylist: null,
    mainPlaylistId: null,
    RightList: false,
    leftList: false,
    centerList: false,
    isAddingSong: false,
    showMusic: false,
  };
  useEffect(() => {
    getMenu();
  }, []);
  const [state, dispatch] = useReducer(appReducer, initialState);
  const getMenu = async () => {
    try {
      const res = await fetch(`https://nejat.safine.co/api/menu/`);
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

  const getAllPlaylists = async () => {
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("tokenAccess")
    );

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetchapi("https://nejat.safine.co/api/account/playlist/", requestOptions)
      // .then((response) => )
      .then(
        (result) =>
          dispatch({
            type: GET_USER_PLAYLISTS,
            payload: result.body,
          }) & findMainPlaylist(result.body)
        // &
        // console.log(result)
      )
      .catch((error) => console.log(error));
  };
  const findMainPlaylist = (list) => {
    // console.log(list);
    list.map((item) => {
      {
        item.name === "main playlist" &&
          dispatch({ type: FIND_MAIN_PLAYLIST, payload: item.id });
      }
    });
  };

  const updatePlaylistName = (id, newName) => {
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("tokenAccess")
    );
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({ id: id, name: newName });

    let requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetchapi(
      "https://nejat.safine.co/api/account/playlist/update/",
      requestOptions
    )
      // .then((response) => response.json())
      // .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  const removePlaylist = (id) => {
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("tokenAccess")
    );
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({ id: id, status: "delete" });

    let requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetchapi(
      "https://nejat.safine.co/api/account/playlist/update/",
      requestOptions
    )
      // .then((response) => response.json())
      // .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const makeNewPlaylist = (name) => {
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("tokenAccess")
    );
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify([{ name: name, status: "publish" }]);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetchapi("https://nejat.safine.co/api/account/playlist/", requestOptions)
      // .then((response) => response.json())
      .then((result) => getAllPlaylists())
      .catch((error) => console.log("error", error));
  };
  const removeSongFromPlaylist = async (form) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    const formdate = {
      id: form,
      status: "delete",
    };
    try {
      const res = await axios.instanceApi.patch(
        "/account/playlist/item/",
        formdate,
        config
      );
      console.log(res.data);
      getAllPlaylists();
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const addMusicToPlaylist = (id) => {
    // console.log(id);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("tokenAccess")
    );

    let raw = JSON.stringify({
      playlist: id,
      fileItem: state.whichSongToSaveInPlaylist,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetchapi(
      "https://nejat.safine.co/api/account/playlist/item/",
      requestOptions
    )
      // .then((response) => response.json())
      .then((result) => console.log(result.body))
      .then(() => showCenterList(false))
      .then(() => getAllPlaylists())
      .catch((error) => console.log("error", error));
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

  const setWhichSongToSaveInPlaylist = (songId) => {
    showCenterList(true);
    console.log(songId);
    dispatch({
      type: SET_SONG_ID,
      payload: songId,
    });
    dispatch({
      type: IS_ADDING_NEW_SONG_TO_PLAYLIST,
    });
  };

  const changeCurrentPassword = (newPass, oldPass) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("tokenAccess")
    );

    let raw = JSON.stringify({
      old_password: oldPass,
      new_password: newPass,
    });

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetchapi(
      "https://nejat.safine.co/api/account/change-password/",
      requestOptions
    )
      // .then((response) => response.json())
      .then((result) => console.log(result.body))
      .catch((error) => console.log("error", error));
  };
  return (
    <AppContext.Provider
      value={{
        getMenu,
        showRightList,
        showLeftList,
        showCenterList,
        ChangeShowMusic,
        getAllPlaylists,
        updatePlaylistName,
        removePlaylist,
        makeNewPlaylist,
        addMusicToPlaylist,
        setWhichSongToSaveInPlaylist,
        changeCurrentPassword,
        showMusic: state.showMusic,
        menu: state.menu,
        RightList: state.RightList,
        leftList: state.leftList,
        centerList: state.centerList,
        userPlaylists: state.userPlaylists,
        mainPlaylistId: state.mainPlaylistId,
        isAddingSong: state.isAddingSong,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
