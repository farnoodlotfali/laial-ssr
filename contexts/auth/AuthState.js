import { useContext, useReducer } from "react";
import authContext from "./authContext";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from "./types";
import authReducer from "./authReducer";
import appContext from "../app/appContext";
import { fetchapi } from "../../fetchapi/fetchApi";
const AuthState = (props) => {
  const initialState = {
    // tokenAccess: localStorage.getItem('tokenAccess'),
    // tokenRefresh: localStorage.getItem('tokenRefresh'),
    isAuth: false,
    loading: true,
    error: null,
    user:
      process.browser && localStorage.getItem("user") === "undefined"
        ? null
        : process.browser && JSON.parse(localStorage.getItem("user")),
  };
  const { getAllPlaylists } = useContext(appContext);

  const [state, dispatch] = useReducer(authReducer, initialState);
  const loadUser = () => {
    if (localStorage.tokenAccess) {
      dispatch({
        type: USER_LOADED,
      });
    }
    if (state.user) {
      getAllPlaylists();
    }
  };

  const login = async (form) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({ email: form.email, password: form.password });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetchapi("https://nejat.safine.co/api/account/login/", requestOptions)
      // .then((response) => console.log(response.body))
      .then((result) =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: result.body,
        })
      )
      // .then((res) => console.log(res))
      .then(() => loadUser())
      .then(() => getAllPlaylists())
      .catch((error) =>
        // console.log(error)
        dispatch({
          type: LOGIN_FAIL,
          payload: error,
        })
      );

    //   getAllPlaylists();
  };

  const register = (form) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: form.username,
      email: form.email,
      password: form.password,
      first_name: form.first_name,
      last_name: form.last_name,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetchapi("https://nejat.safine.co/api/account/register/", requestOptions)
      // .then((response) => response.json())
      .then((result) =>
        dispatch({
          type: REGISTER_SUCCESS,
          payload: result.body,
        })
      )
      .then(() => loadUser())
      .catch((error) =>
        dispatch({
          type: REGISTER_FAIL,
          payload: error,
        })
      );
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  return (
    <authContext.Provider
      value={{
        register,
        loadUser,
        logout,
        login,
        // testAuth,
        isAuth: state.isAuth,
        user: state.user,
        error: state.error,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
