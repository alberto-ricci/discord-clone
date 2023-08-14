import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "messages",
  initialState: {
    channels: {},
  },
  reducers: {
    incrementUnread: (state, action) => {
      const { channelId } = action.payload;
      if (!state.channels[channelId]) {
        state.channels[channelId] = 1;
      } else {
        state.channels[channelId]++;
      }
    },
    markAsRead: (state, action) => {
      const { channelId } = action.payload;
      if (state.channels[channelId]) {
        state.channels[channelId] = 0;
      }
    },
  },
});

export const { incrementUnread, markAsRead } = messageSlice.actions;

export const selectUnreadCount = (state, channelId) =>
  state.messages.channels[channelId] || 0;

export default messageSlice.reducer;
