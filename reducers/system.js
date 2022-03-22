import { THEME } from "../utils/token";

const initialState = {
  isLoading: false,
  themeMode: "light",
};

const SET_THEME_MODE = "SET_THEME_MODE";
const SWITCH_THEME_MODE = "SWITCH_THEME_MODE";

const START_LOADING = "START_LOADING";
const END_LOADING = "END_LOADING";

const setThemeModeAction = (data) => {
  return {
    type: SET_THEME_MODE,
    data: data,
  };
};
const switchThemeModeAction = () => {
  return {
    type: SWITCH_THEME_MODE,
  };
};

const startLoadingAction = () => {
  return {
    type: START_LOADING,
  };
};
const endLoadingAction = () => {
  return {
    type: END_LOADING,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME_MODE: {
      return {
        ...state,
        themeMode: action.data,
      };
    }
    case SWITCH_THEME_MODE: {
      let nextTheme = state.themeMode === "light" ? "dark" : "light";
      localStorage.setItem(THEME, nextTheme);
      return {
        ...state,
        themeMode: nextTheme,
      };
    }
    case START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case END_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;

export {
  initialState,
  setThemeModeAction,
  switchThemeModeAction,
  startLoadingAction,
  endLoadingAction,
};
