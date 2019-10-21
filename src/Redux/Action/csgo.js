import Axios from "axios";

// const headers = {};

export const getCsgoPlayer = () => {
  return {
    type: "GET_CSGO_PLAYER",
    payload: Axios.get(
      `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/76561198149145370`,
      {
        headers: {
          "TRN-Api-Key": "a96baa27-977f-4689-97da-217ef7a5bf6c"
        }
      }
    )
  };
};
