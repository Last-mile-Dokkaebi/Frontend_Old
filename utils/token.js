const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const IDENTITY = "identity";

const setIdentity = (identity) => {
  localStorage.setItem(IDENTITY, identity);
};

const getIdentity = () => {
  if (localStorage.getItem(IDENTITY)) {
    return localStorage.getItem(IDENTITY);
  }
};

const setToken = ({ accessToken, refreshToken }) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const getAccessToken = () => {
  if (localStorage.getItem(ACCESS_TOKEN)) {
    return localStorage.getItem(ACCESS_TOKEN);
  }
};

const getRefreshToken = () => {
  if (localStorage.getItem(REFRESH_TOKEN)) {
    return localStorage.getItem(REFRESH_TOKEN);
  }
};

export {
  setIdentity,
  getIdentity,
  setToken,
  removeToken,
  getAccessToken,
  getRefreshToken,
};
