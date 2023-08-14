import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import appReducer from "../features/appSlice";
import messageReducer from "../features/messageSlice";
import channelReducer from "../features/channelSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    messages: messageReducer,
    channels: channelReducer,
  },
});
