import React from "react";
import "./SidebarChannel.css";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../features/appSlice";
import { markAsRead } from "../features/messageSlice";

function SidebarChannel({ id, channel }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channel,
      })
    );
    dispatch(markAsRead({ channelId: id }));
  };

  return (
    <div className="sidebarChannel" onClick={handleClick}>
      <h4>
        <span className="sidebarChannel__hash">#</span>
        {channel}
      </h4>
    </div>
  );
}

export default SidebarChannel;
