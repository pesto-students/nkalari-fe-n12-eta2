import { combineReducers } from "redux";
import { getTransactions } from "./transactions.reducer";
import { getProfile } from "./profile.reducer";


const rootReducer = combineReducers({
    getTransactions:getTransactions,
    getProfile :  getProfile
});

export default rootReducer;
