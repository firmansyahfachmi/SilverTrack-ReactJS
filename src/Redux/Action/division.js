import Axios from "axios";

const headers = {
  headers: {
    "TRN-Api-Key": process.env.REACT_APP_API_KEY /* || Your API KEY */
  }
};

// Solivictus

export const getDivisionPlayer = search => {
  return {
    type: "GET_DIVISION_PLAYER",
    payload: Axios.get(
      `https://public-api.tracker.gg/v2/division-2/standard/profile/uplay/${search}`,
      headers
    )
  };
};
