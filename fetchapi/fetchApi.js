import { useRouter } from "next/router";
import { configureRefreshFetch, fetchJSON } from "refresh-fetch";
import merge from "lodash/merge";

const clearToken = () => {
  localStorage.removeItem("tokenAccess");
  localStorage.removeItem("tokenRefresh");
  localStorage.removeItem("user");
  window.location = "/login";
};

const saveToken = (access) => {
  localStorage.setItem("tokenAccess", access);
};
const fetchJSONWithToken = (url, options = {}) => {
  const token = localStorage.getItem("tokenAccess");
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("tokenAccess")
  );

  let optionsWithToken = options;
  if (token != null) {
    optionsWithToken = merge({}, options, {
      headers: myHeaders,
    });
  }

  return fetchJSON(url, optionsWithToken);
};
const shouldRefreshToken = (error) => error.response.status === 401;

const refreshToken = async () => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({ refresh: localStorage.getItem("tokenRefresh") });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetchJSONWithToken(
    "https://nejat.safine.co/api/token/refresh/",
    requestOptions
  )
    .then((response) => {
      //   console.log(response.body.access);
      saveToken(response.body.access);
      return response;
    })
    .catch((error) => {
      clearToken();
      throw error;
    });
};

const fetchapi = configureRefreshFetch({
  fetch: fetchJSONWithToken,
  shouldRefreshToken,
  refreshToken,
});

export {
  fetchapi,
  //   login,
  // logout
};
