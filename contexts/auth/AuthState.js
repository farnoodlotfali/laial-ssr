import { useContext, useEffect, useReducer } from "react";
import authContext from "./authContext";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  GET_TAGS,
  SAVE_TAGS_SUCCESS,
  FORCE_LOGIN,
  CHANGE_SHOW_LOGIN_MODAL,
} from "./types";
import authReducer from "./authReducer";
import appContext from "../app/appContext";

import { useRouter } from "next/router";
import axios from "../../axios/axios";
const AuthState = (props) => {
  const initialState = {
    // tokenAccess: localStorage.getItem('tokenAccess'),
    // tokenRefresh: localStorage.getItem('tokenRefresh'),
    isAuth: false,
    showLoginModal: false,
    isUserChooseTags:
      process.browser && localStorage.getItem("favorite_items") === "undefined"
        ? null
        : process.browser && JSON.parse(localStorage.getItem("favorite_items")),
    loading: true,
    error: null,
    user:
      process.browser && localStorage.getItem("user") === "undefined"
        ? null
        : process.browser && JSON.parse(localStorage.getItem("user")),
    tags: null,
    tagsUrls: {
      next: null,
      previous: null,
    },
    forceToLoginDueTo10SongListened:
      process.browser && localStorage.getItem("limitListTo10") === "undefined"
        ? null
        : process.browser &&
          JSON.parse(localStorage.getItem("limitListTo10"))?.length >= 10
        ? true
        : false,
  };
  const { getAllPlaylists, LimitListPlayNonLogin } = useContext(appContext);

  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [state.user]);
  //load user
  const loadUser = async () => {
    if (localStorage.tokenAccess) {
      getAllPlaylists();

      dispatch({
        type: USER_LOADED,
      });
    }
    if (!state.isUserChooseTags && state.user !== null) {
      router.push("/user-interests");
    }
  };

  const login = async (form) => {
    // let myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // let raw = JSON.stringify({ email: form.email, password: form.password });

    // let requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };
    // try {
    //   const res = await fetchapi(
    //     "https://nejat.safine.co/api/account/login/",
    //     requestOptions
    //   );
    //   dispatch({
    //     type: LOGIN_SUCCESS,
    //     payload: res.body,
    //   });
    //   loadUser();
    //   getAllPlaylists();
    //   return true;
    // } catch (error) {
    //   //  console.log(error)
    //   dispatch({
    //     type: LOGIN_FAIL,
    //     payload: error?.response?.data,
    //   });
    // }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    try {
      const res = await axios.instanceApi.post("/account/login/", form, config);
      // console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
      getAllPlaylists();

      return true;
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_FAIL,
        payload: error,
      });
    }
    return false;
  };

  const register = async (form) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      const res = await axios.instanceApi.post(
        "/account/register/",
        formData,
        config
      );
      // console.log(res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();

      return true;
    } catch (error) {
      console.log(error);
      dispatch({
        type: REGISTER_FAIL,
        payload: error,
      });
    }
    return false;
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const getTags = async () => {
    try {
      const res = await axios.simpleApi.get("/tags");
      console.log(res.data);
      dispatch({
        type: GET_TAGS,
        payload: res.data,
      });
    } catch (error) {}
  };

  // saveChosenTags is NOT complete check
  const saveChosenTags = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };

    // const formData = {
    //   email: email,
    // };

    try {
      // eslint-disable-next-line
      const res = await axios.instanceApi.post(
        `/account/tags/`,
        formData,
        config
      );
      // console.log(res.status);
      dispatch({
        type: SAVE_TAGS_SUCCESS,
      });
      // return res.status;
    } catch (error) {
      console.log(error);
    }
  };

  const forceLogin = () => {
    dispatch({
      type: FORCE_LOGIN,
    });
  };
  const changeShowLoginModal = (newValue) => {
    dispatch({
      payload: newValue,
      type: CHANGE_SHOW_LOGIN_MODAL,
    });
  };
  const checkIfForce = () => {
    return (
      JSON.parse(localStorage.getItem("limitListTo10"))?.length >=
      LimitListPlayNonLogin
    );
  };

  return (
    <authContext.Provider
      value={{
        register,
        loadUser,
        logout,
        login,
        getTags,
        saveChosenTags,
        forceLogin,
        changeShowLoginModal,
        checkIfForce,
        isAuth: state.isAuth,
        user: state.user,
        error: state.error,
        isUserChooseTags: state.isUserChooseTags,
        tags: state.tags,
        tagsUrls: state.tagsUrls,
        showLoginModal: state.showLoginModal,
        forceToLoginDueTo10SongListened: state.forceToLoginDueTo10SongListened,
        // tokenAccess: state.tokenAccess,
        // tokenRefresh: state.tokenRefresh,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
