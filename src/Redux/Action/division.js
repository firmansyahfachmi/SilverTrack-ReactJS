import Axios from "axios";

const headers = {
  headers: {
    "TRN-Api-Key": "a96baa27-977f-4689-97da-217ef7a5bf6c"
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
