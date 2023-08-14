import { createSlice } from "@reduxjs/toolkit";

export const channelSlice = createSlice({
  name: "channels",
  initialState: [],
  reducers: {
    addChannel: (state, action) => {
      state.push(action.payload);
    },
    removeChannel: (state, action) => {
      const newState = state.filter(
        (channel) => channel.channelId !== action.payload
      );

      state.length = 0;

      newState.forEach((item) => state.push(item));
    },
  },
});

export const { addChannel, removeChannel } = channelSlice.actions;

export const selectChannelIds = (state) =>
  state.channels.map((channel) => channel.channelId);

export default channelSlice.reducer;
