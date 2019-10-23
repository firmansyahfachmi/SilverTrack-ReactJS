import Axios from "axios";

const headers = {
  headers: {
    "TRN-Api-Key": process.env.REACT_APP_API_KEY /* || Your API KEY */
  }
};

// 76561198149145370

export const getCsgoPlayer = search => {
  return {
    type: "GET_CSGO_PLAYER",
    payload: Axios.get(
      `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${search}`,
      headers
    )
  };
};
