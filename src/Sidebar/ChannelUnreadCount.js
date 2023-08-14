import React from "react";
import { useSelector } from "react-redux";
import { selectUnreadCount } from "../features/messageSlice";
import "./ChannelUnreadCount.css";
import Tooltip from "@mui/material/Tooltip";

function ChannelUnreadCount({ channelId }) {
  const count = useSelector((state) => selectUnreadCount(state, channelId));

  if (count < 1) {
    return null;
  }

  return (
    <Tooltip title={`${count} unread message(s)`}>
      <span className="unreadCount">{count}</span>
    </Tooltip>
  );
}

export default ChannelUnreadCount;
