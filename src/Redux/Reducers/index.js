import { combineReducers } from "redux";

import csgo from "./csgo";
import division from "./division";
import apex from "./apex";

const rootReducer = combineReducers({
  csgo,
  division,
  apex
});

export default rootReducer;
