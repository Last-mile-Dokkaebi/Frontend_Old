import { ACCESS_TOKEN, IDENTITY, REFRESH_TOKEN } from "../utils/token";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  identity: null,
  themeMode: "light",
};

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

const CHANGE_THEME = "CHANGE_THEME";

const logInAction = (data) => {
  return {
    type: LOG_IN,
    data,
  };
};

const logOutAction = () => {
  return {
    type: LOG_OUT,
  };
};

const changeThemeAction = () => {
  return {
    type: CHANGE_THEME,
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
    case CHANGE_THEME: {
      return {
        ...state,
        themeMode: !state.themeMode,
      };
    }
    default:
      return state;
  }
};

export default reducer;

export { initialState, logInAction, logOutAction, changeThemeAction };
