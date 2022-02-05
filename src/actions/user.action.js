import { userService } from "./../services/user.service";
import {
  LOGIN_USER,
  userConstants,
  USER_AUTH_IN_PROGRESS,
  IDENTIFY_USER,
  UPDATE_LOGGED_USER,
} from "./../constants/user.constants";
import axios from "axios";
import { store } from "../helpers/store";

export const userActions = {
  getTransactions,
  Signup,
  getProfile,
  stripeCheckout,
  // logout
};

function getTransactions() {
  return (dispatch) => {
    dispatch(request());
    userService.getTransactions().then(
      (transactions) => {
        dispatch(success(transactions));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
  function request(transactions) {
    return { type: userConstants.GETALL_REQUEST, transactions };
  }
  function success(transactions) {
    return { type: userConstants.GETALL_SUCCESS, transactions };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function Signup() {
  return (dispatch) => {
    dispatch(request());
    userService.Signup().then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getProfile() {
  return (dispatch) => {
    dispatch(request());
    userService.getProfile().then(
      (profile) => {
        dispatch(success(profile));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
  function request(profile) {
    return { type: userConstants.GETALL_REQUEST, profile };
  }
  function success(profile) {
    return { type: userConstants.GETALL_SUCCESS, profile };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function stripeCheckout() {
  return (dispatch) => {
    dispatch(request());
    userService.stripeCheckout().then(
      (response) => {
        dispatch(success(response));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
  function request(response) {
    return { type: userConstants.GETALL_REQUEST, response };
  }
  function success(response) {
    return { type: userConstants.GETALL_SUCCESS, response };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

export let userAuthProgress = (payload) => {
  return { type: USER_AUTH_IN_PROGRESS, payload };
};

export let loginUser = (payload) => {
  return { type: LOGIN_USER, payload };
};

export let fetchLoggedUser = (payload) => {
  return { type: IDENTIFY_USER, payload };
};

export let updateLoggedUser = (payload) => {
  return { type: UPDATE_LOGGED_USER, payload };
};

export let userLogin = (payload) => {
  return function () {
    localStorage.setItem("nkalari", payload.idToken);

    store.dispatch(
      userAuthProgress({
        isAuthInProgress: true,
      })
    );
    return axios
      .post(
        `${process.env.REACT_APP_DOMAIN}/api/users/login`,
        {
          phoneNumber: payload.phoneNumber,
        },
        {
          headers: {
            authorization: payload.idToken,
          },
        }
      )
      .then((response) => {
        store.dispatch(
          loginUser({
            currentUser: response.data.user,
            isAuthInProgress: false,
            isAuthDone: true,
          })
        );
        return response.data;
      });
  };
};

export let identifyLoggedUser = () => {
  return function () {
    if (localStorage.nkalari) {
      let token = localStorage.nkalari;
      store.dispatch(
        userAuthProgress({ isAuthInProgress: true, isAuthDone: false })
      );
      return axios
        .get(`${process.env.REACT_APP_DOMAIN}/api/users/me`, {
          headers: { authorization: token },
        })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.user, "user identified");
            store.dispatch(
              fetchLoggedUser({
                currentUser: res.data.user,
                isAuthInProgress: false,
                isAuthDone: true,
              })
            );
          } else {
            console.log(localStorage.nkalari, "token removed");
            localStorage.removeItem("nkalari");
          }
        })
        .catch((err) => {
          console.log(localStorage.nkalari, "token removed");
          localStorage.removeItem("nkalari");
          console.log(err, "invalid user");
        });
    }
  };
};

export let updateUser = (payload) => {
  return function () {
    const { firstName, lastName, email, gender, profileImageUrl } = payload;
    return axios
      .put(
        `${process.env.REACT_APP_DOMAIN}/api/users`,
        { firstName, lastName, email, gender, profileImageUrl },
        {
          headers: {
            authorization: localStorage.getItem("nkalari"),
          },
        }
      )
      .then((response) => {
        store.dispatch(updateLoggedUser({ currentUser: response.data.user }));
        return response.data;
      });
  };
};

export let getRtmToken = (payload) => {
  return function () {
    const { channelName } = payload;
    return axios
      .get(
        `${process.env.REACT_APP_DOMAIN}/api/agora-token/rtm?channelName=${channelName}`,
        {
          headers: {
            authorization: localStorage.getItem("nkalari"),
          },
        }
      )
      .then((response) => response.data.token);
  };
};

// logout current user
export const logout = () => {
  return () => {
    localStorage.clear();
    // window.location.href = "/";
  };
};

export let getRtcToken = (payload) => {
  return function () {
    const { channelName, role } = payload;
    return axios
      .get(
        `${process.env.REACT_APP_DOMAIN}/api/agora-token/rtc?channelName=${channelName}&&role=${role}`,
        {
          headers: {
            authorization: localStorage.getItem("nkalari"),
          },
        }
      )
      .then((response) => response.data.token);
  };
};
// export let logout = () => {
//   return function () {
//     localStorage.clear();
//     window.location.href = "/";
//   };
// };
