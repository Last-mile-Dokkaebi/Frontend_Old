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
      return {
        ...state,
        isLoggedIn: true,
        myId: action.data
      }
    }
    case LOG_OUT:
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