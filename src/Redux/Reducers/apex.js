const initialState = {
  apexPlayer: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false
};

const apex = (state = initialState, action) => {
  switch (action.type) {
    case "GET_APEX_PLAYER_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_APEX_PLAYER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "GET_APEX_PLAYER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        apexPlayer: action.payload.data.data
      };
    default:
      return state;
  }
};

export default apex;
