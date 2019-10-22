const initialState = {
  divisionPlayer: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false
};

const division = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DIVISION_PLAYER_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_DIVISION_PLAYER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "GET_DIVISION_PLAYER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        divisionPlayer: action.payload.data.data
      };
    default:
      return state;
  }
};

export default division;
