import { ACCESS_TOKEN, IDENTITY, REFRESH_TOKEN } from "../utils/token";

const initialState = {
  isLoggedIn: false,
  identity: null,
};

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

const loginAction = (data) => {
  return {
    type: LOG_IN,
    data,
  };
};

const logoutAction = () => {
  return {
    type: LOG_OUT,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      const { identity, accessToken, refreshToken } = action.data;
      localStorage.setItem(IDENTITY, identity);
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      return {
        ...state,
        isLoggedIn: true,
        identity: identity,
      };
    }
    case LOG_OUT: {
      localStorage.removeItem(IDENTITY);
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      return {
        ...state,
        isLoggedIn: false,
        myId: null,
      };
    }
    default:
      return state;
  }
};

export default reducer;

export { initialState, loginAction, logoutAction };
