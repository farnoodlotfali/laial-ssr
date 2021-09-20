import { useEffect, useReducer, useState } from "react";
import AppContext from "./appContext";
import appReducer from "./appReducer";

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
  SET_LOADING_ON_USER_PLAYLIST,
  REMOVE_LOADING_ON_USER_PLAYLIST,
  CHANGE_MY_PROFILE_MY_SONGLIST_ID,
  CHANGE_SHOW_CREATE_LIST,
  THIS_SONG_HAS_BEEN_ADD,
} from "./types";
import { useRouter } from "next/router";
import axios from "../../axios/axios";
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
    loadingOnUserPlaylist: false,
    LimitListPlayNonLogin: 10,
    showCreateList: false,
    myProfilemySonglistId: null,
    thisSongHasBeenAddedToRecentlyViwed: null,
  };
  useEffect(() => {
    getMenu();
    getConfig();
    // getRecentlyViewedSongsPlaylist();
    // getAllPlaylists();
  }, []);
  const [state, dispatch] = useReducer(appReducer, initialState);
  const getMenu = async () => {
    try {
      const resData = await axios.instanceApi.get(`/menu/`);
      // console.log(resData);
      dispatch({
        type: GET_MENU,
        payload: resData.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPlaylists = async () => {
    // let myHeaders = new Headers();
    // myHeaders.append(
    //   "Authorization",
    //   "Bearer " + localStorage.getItem("tokenAccess")
    // );

    // let requestOptions = {
    //   method: "GET",
    //   headers: myHeaders,
    //   redirect: "follow",
    // };

    // fetchapi("https://nejat.safine.co/api/account/playlist/", requestOptions)
    //   .then(
    //     (result) =>
    //       dispatch({
    //         type: GET_USER_PLAYLISTS,
    //         payload: result.body,
    //       }) & findMainPlaylist(result.body)
    //     // &
    //     // console.log(result)
    //   )
    //   .catch((error) => console.log(error));
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    try {
      const res = await axios.instanceApi.get("/account/playlist/", config);
      // console.log(res.data);
      findMainPlaylist(res.data);
      dispatch({
        type: GET_USER_PLAYLISTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
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

  const updatePlaylistName = async (id, newName) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    const formdate = {
      id: id,
      name: newName,
    };
    try {
      const res = await axios.instanceApi.patch(
        "/account/playlist/update/",
        formdate,
        config
      );
      getAllPlaylists();
    } catch (error) {
      console.log(error);
    }
  };
  const removePlaylist = async (form) => {
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
        "/account/playlist/update/",
        formdate,
        config
      );
      // console.log(res.data);
      getAllPlaylists();
    } catch (error) {
      console.log(error);
    }
  };

  const makeNewPlaylist = async (form) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };

    try {
      await axios.instanceApi.post("/account/playlist/", form, config);
      // console.log(res.data);
      getAllPlaylists();
      return true;
    } catch (error) {
      console.log(error);
    }
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
      console.log(error);
    }
  };

  const addMusicToPlaylist = async (form) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    const formData = {
      playlist: form,
      post: state.whichSongToSaveInPlaylist,
    };

    try {
      await axios.instanceApi.post("/account/playlist/item/", formData, config);
      getAllPlaylists();

      dispatch({
        type: ADD_SONG_SUCCESS,
      });

      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
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
    // console.log(songId);
    dispatch({
      type: SET_SONG_ID,
      payload: songId,
    });
    dispatch({
      type: IS_ADDING_NEW_SONG_TO_PLAYLIST,
    });
  };

  const changeCurrentPassword = async (newPass, oldPass) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };

    const formData = {
      old_password: oldPass,
      new_password: newPass,
    };
    try {
      const res = await axios.instanceApi.put(
        `/account/change-password/`,
        formData,
        config
      );
      console.log(res.status);

      return res.status;
    } catch (error) {
      console.log(error);
    }
  };

  const getConfig = async () => {
    try {
      const resdata = await axios.instanceApi.get("/configs/");

      dispatch({
        type: GET_CONFIGS,
        payload: resdata.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addMusicToMAINPlaylist = async (postId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    // console.log(postId);
    // console.log(state.mainPlaylistId);
    const formData = {
      playlist: state.mainPlaylistId,
      post: postId,
    };

    try {
      // eslint-disable-next-line
      const res = await axios.instanceApi.post(
        "/account/playlist/item/",
        formData,
        config
      );
      // console.log(res.data);
      getAllPlaylists();
    } catch (error) {
      console.log(error);
    }
  };

  const getLikedSongsPlaylist = async () => {
    dispatch({
      type: SET_LOADING_ON_USER_PLAYLIST,
    });
    const config = {
      headers: {
        "Content-Type": "app;ication/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };

    try {
      const res = await axios.instanceApi.get("/account/like/", config);
      // console.log(res.data);
      dispatch({
        type: REMOVE_LOADING_ON_USER_PLAYLIST,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getRecentlyViewedSongsPlaylist = async () => {
    dispatch({
      type: SET_LOADING_ON_USER_PLAYLIST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };

    try {
      const res = await axios.instanceApi.get(
        "/account/recently-view/",
        config
      );
      // console.log(res.data);
      dispatch({
        type: REMOVE_LOADING_ON_USER_PLAYLIST,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getOnePlayList = async (id) => {
    dispatch({
      type: SET_LOADING_ON_USER_PLAYLIST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    try {
      const res = await axios.instanceApi.get(
        `/account/playlist/?playlist=${id}`,
        config
      );
      dispatch({
        type: REMOVE_LOADING_ON_USER_PLAYLIST,
      });
      res.data?.[0]?.items.map((item) => {
        // for put PostIdForDeleteFromUserPlaylist for deleteing
        // console.log(item.post.PostIdForDeleteFromUserPlaylist);
        return (item.post.PostIdForDeleteFromUserPlaylist = item.id);
      });
      // console.log(res.data);
      return res.data?.[0]?.items;
    } catch (error) {}
  };
  const changeMyProfilemySonglistId = (id) => {
    dispatch({
      type: CHANGE_MY_PROFILE_MY_SONGLIST_ID,
      payload: id,
    });
  };
  const ChangeShowCreateList = (newValue) => {
    // setShowMusic(!showMusic);

    dispatch({
      type: CHANGE_SHOW_CREATE_LIST,
      payload: newValue,
    });
  };
  const addToLikedSongPlaylist = async (postId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    const form = {
      post: postId,
    };
    try {
      const res = await axios.instanceApi.post("/account/like/", form, config);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addMusicToRecentlyViewed = async (duration, postId) => {
    dispatch({
      type: THIS_SONG_HAS_BEEN_ADD,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    const form = {
      duration: duration,
      post: postId,
    };
    // console.log(form);

    try {
      // eslint-disable-next-line
      const res = await axios.instanceApi.post(
        "/account/recently-view/",
        form,
        config
      );

      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
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
        addMusicToMAINPlaylist,
        getLikedSongsPlaylist,
        getOnePlayList,
        getRecentlyViewedSongsPlaylist,
        changeMyProfilemySonglistId,
        ChangeShowCreateList,
        addToLikedSongPlaylist,
        addMusicToRecentlyViewed,
        showMusic: state.showMusic,
        menu: state.menu,
        RightList: state.RightList,
        leftList: state.leftList,
        centerList: state.centerList,
        userPlaylists: state.userPlaylists,
        mainPlaylistId: state.mainPlaylistId,
        LimitListPlayNonLogin: state.LimitListPlayNonLogin,
        isAddingSong: state.isAddingSong,
        loadingOnUserPlaylist: state.loadingOnUserPlaylist,
        myProfilemySonglistId: state.myProfilemySonglistId,
        showCreateList: state.showCreateList,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
