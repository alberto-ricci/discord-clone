import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    onlineUsers: [],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setUserChannel: (state, action) => {
      const { userId, currentChannel } = action.payload;
      const user = state.onlineUsers.find((user) => user.userId === userId);
      if (user) {
        user.currentChannel = currentChannel;
      }
    },
  },
});

export const { login, logout, updateOnlineUsers } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectOnlineUsers = (state) => state.user.onlineUsers;

export default userSlice.reducer;
