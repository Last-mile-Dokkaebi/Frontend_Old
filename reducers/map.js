const initialState = {
  rentalVisible: false, //rental관련 컴포넌트 활성화 상태
  scooter: null, //현재 선택 된 바이크의 상태
};

const USER_CLICK_POSSIBLE_SCOOTER = "CLIBK_POSSIBLE_SCOOTER";
const USER_UNCLICK_POSSIBLE_SCOOTER = "USER_UNCLICK_POSSIBLE_SCOOTER";

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

    default:
      return state;
  }
};

export default reducer;

export {
  initialState,
  userClickPossibleScooterAction,
  userUnclickPossibleScooterAction,
};
