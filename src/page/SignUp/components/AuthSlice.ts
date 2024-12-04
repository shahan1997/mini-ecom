import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthorized: boolean;
}

const initialState: AuthState = {
  isAuthorized: JSON.parse(localStorage.getItem("isAuthorized") || "false"),
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEnableAuth: (state) => {
      state.isAuthorized = true;
      localStorage.setItem("isAuthorized", JSON.stringify(true));
    },
    setDisableAuth: (state) => {
      state.isAuthorized = false;
      localStorage.setItem("isAuthorized", JSON.stringify(false));
    },
  },
});

export const { setEnableAuth, setDisableAuth } = auth.actions;

export const AuthReducer = auth.reducer;

export { initialState as AuthInitialState };
