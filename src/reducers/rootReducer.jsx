import { combineReducers } from "redux";
import { getTransactions } from "./transactions.reducer";
import { getProfile } from "./profile.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  getTransactions: getTransactions,
  getProfile: getProfile,
  user: userReducer,
});

export default rootReducer;
