import { HYDRATE } from "next-redux-wrapper";

import user from "./user";
import map from "./map";
import system from "./system";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE: {
        return { ...state, ...action.payload };
      }
      default:
        return state;
    }
  },
  user,
  map,
  system,
});

export default rootReducer;
