import { removeToken, setIdentity, setToken } from "../utils/token"

const initialState = {
  isLoggedIn: false,
  myId: null,
}

const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      const { identity, accessToken, refreshToken } = action.data
      setToken({ accessToken, refreshToken })
      setIdentity(identity)
      return {
        ...state,
        isLoggedIn: true,
        identity: identity
      }
    }
    case LOG_OUT:
      removeToken()
      return {
        ...state,
        isLoggedIn: false,
        myId: null,
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
}