const initialState = {
  rentalVisible: false, //rental관련 컴포넌트 활성화 상태
  scooter: null, //현재 선택 된 바이크의 상태
  currentHistory: null, //현재 보고있는 history
  histories: [], //path의 경로를 담고 있음
};

const USER_CLICK_POSSIBLE_SCOOTER = "CLIBK_POSSIBLE_SCOOTER";
const USER_UNCLICK_POSSIBLE_SCOOTER = "USER_UNCLICK_POSSIBLE_SCOOTER";
const CHANGE_HISTORY = "CHANGE_HISTORY";
const SET_HISTORIES = "SET_HISTORIES";

const userClickPossibleScooterAction = (data) => {
  return {
    type: USER_CLICK_POSSIBLE_SCOOTER,
    data,
  };
};

const userUnclickPossibleScooterAction = () => {
  return {
    type: USER_UNCLICK_POSSIBLE_SCOOTER,
  };
};

const changeHistoryAction = (data) => {
  return {
    type: CHANGE_HISTORY,
    data,
  };
};

const setHistoriesAction = (data) => {
  return {
    type: SET_HISTORIES,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CLICK_POSSIBLE_SCOOTER: {
      console.log(action.data);
      return {
        ...state,
        rentalVisible: true,
        scooter: action.data,
      };
    }
    case USER_UNCLICK_POSSIBLE_SCOOTER: {
      return {
        ...state,
        rentalVisible: false,
        scooter: null,
      };
    }
    case CHANGE_HISTORY: {
      return {
        ...state,
        currentHistory: action.data,
      };
    }
    case SET_HISTORIES: {
      return {
        ...state,
        histories: action.data,
      };
    }

    default:
      return state;
  }
};

export default reducer;

export {
  initialState,
  userClickPossibleScooterAction,
  userUnclickPossibleScooterAction,
  changeHistoryAction,
  setHistoriesAction,
};
