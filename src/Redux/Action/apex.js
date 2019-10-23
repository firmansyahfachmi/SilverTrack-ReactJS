import Axios from "axios";

const headers = {
  headers: {
    "TRN-Api-Key": process.env.REACT_APP_API_KEY
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
