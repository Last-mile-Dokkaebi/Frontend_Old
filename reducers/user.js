import { removeToken, setIdentity, setToken } from "../utils/token"

const initialState = {
  isLoggedIn: false,
  isJoinPage: false,
  myId: null,
}

const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'
const JOIN_PAGE = 'JOIN_PAGE'
const EXIT_JOIN_PAGE = 'EXIT_JOIN_PAGE'

const loginAction = (data) => {
  return {
    type: LOG_IN,
    data,
  }
}

const logoutAction = () => {
  return {
    type: LOG_OUT,
  }
}

const joinPageAction = () => {
  return {
    type: JOIN_PAGE,
  }
}

const exitJoinPageAction = () => {
  return {
    type: EXIT_JOIN_PAGE,
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      const { identity, accessToken, refreshToken } = action.data
      setToken({ accessToken, refreshToken })
      setIdentity(identity)
      return {
        ...state,
        isLoggedIn: true,
        identity: identity,
      }
    }
    case LOG_OUT: {
      removeToken()
      return {
        ...state,
        isLoggedIn: false,
        myId: null,
      }
    }
    case JOIN_PAGE: {
      return {
        ...state,
        isJoinPage: true,
      }
    }
    case EXIT_JOIN_PAGE: {
      return {
        ...state,
        isJoinPage: false,
      }
    }
    default:
      return state;
  }
}

export default reducer;

export {
  initialState,
  loginAction,
  logoutAction,
  joinPageAction,
  exitJoinPageAction,
}