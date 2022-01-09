import { userService } from "./../services/user.service"
import { userConstants } from "./../constants/user.constants";

export const userActions = {
    getTransactions,
    Signup
  };

  function getTransactions(){
      return (dispatch) => {
          dispatch(request());
          userService.getTransactions().then((transactions)=>{
            dispatch(success(transactions));

          },
          (error) => {
            dispatch(failure(error.toString()));

          })
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

  function Signup(){
    return (dispatch) => {
        dispatch(request());
        userService.Signup().then((user)=>{
          dispatch(success(user));

        },
        (error) => {
          dispatch(failure(error.toString()));

        })
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