/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from "@reduxjs/toolkit";
import { AuthReducer } from "../page/SignUp/components/AuthSlice";
import { BasketReducer } from "../page/Dashboard/store/BasketSlice";

export const ROOT_ACTIONS = {
  logout: "logout",
};

// Define the Reducers that will always be present in the application
const staticReducers = {
  auth: AuthReducer,
  basket: BasketReducer,
};

const createReducer = (asyncReducers?: any) => (state: any, action: any) => {
  let combinedReducer;
  if (asyncReducers) {
    combinedReducer = combineReducers({
      ...staticReducers,
      ...asyncReducers,
    });
  } else {
    // Else just combine the static reducers
    combinedReducer = combineReducers({
      ...staticReducers,
    });
  }

  /**
   * Reset the redux store when user logged out
   */
  if (action.type === ROOT_ACTIONS.logout) {
    state = undefined;
  }

  return combinedReducer
    ? combinedReducer(state, action as never)
    : { ...state };
};

createReducer();

export default createReducer;
