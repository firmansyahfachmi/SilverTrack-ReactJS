import Axios from "axios";

const headers = {
  headers: {
    "TRN-Api-Key": "a96baa27-977f-4689-97da-217ef7a5bf6c"
  }
};

// Daltoosh

export const getApexPlayer = search => {
  return {
    type: "GET_APEX_PLAYER",
    payload: Axios.get(
      `https://public-api.tracker.gg/v2/apex/standard/profile/psn/${search}`,
      headers
    )
  };
};
