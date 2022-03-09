import { HYDRATE } from "next-redux-wrapper";

import user from "./user";
import map from "./map";

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
});

export default rootReducer;
