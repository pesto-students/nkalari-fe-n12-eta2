import { combineReducers } from "redux";
import { getTransactions } from "./transactions.reducer";


const rootReducer = combineReducers({
    getTransactions:getTransactions
});

export default rootReducer;
