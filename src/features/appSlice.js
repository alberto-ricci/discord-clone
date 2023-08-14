import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    channelId: null,
    channelName: null,
    channelIds: [],
  },
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
    setChannelIds: (state, action) => {
      state.channelIds = action.payload;
    },
  },
});

export const { setChannelInfo, setChannelIds } = appSlice.actions;

export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;
export const selectChannelIds = (state) => state.app.channelIds;

export default appSlice.reducer;
