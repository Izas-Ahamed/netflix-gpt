import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeUser: (state) => {
      return null;
    },
    updateUserApiCallLimit: (state) => {
      state.apiCallLimit = state.apiCallLimit - 1;
    },
  },
});

export const { addUser, removeUser, updateUserApiCallLimit } =
  userSlice.actions;

export default userSlice.reducer;
