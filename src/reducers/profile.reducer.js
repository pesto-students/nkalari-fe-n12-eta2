import { userConstants } from "../constants/user.constants";
import { store } from "../helpers/store";

export function getProfile(state = {}, action) {
  

  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {};
    case userConstants.GETALL_SUCCESS:
      return {
        profile: action.profile,
      };
    case userConstants.GETALL_FAILURE:
      return {};
    default:
      return state;
  }
}

// store.dispatch(getProfile(state));