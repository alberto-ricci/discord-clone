import React, { useState } from "react";
import { Avatar, Tooltip } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import HeadphonesIcon from "@mui/icons-material/Headset";
import SettingsIcon from "@mui/icons-material/Settings";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import HeadsetOffOutlinedIcon from "@mui/icons-material/HeadsetOffOutlined";
import "./UserProfile.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function UserProfile() {
  const user = useSelector(selectUser);
  const [micOn, setMicOn] = useState(true);
  const [headphonesOn, setHeadphonesOn] = useState(true);

  return (
    <div className="sidebar__Profile">
      <div className="sidebar__profileInfo">
        <Avatar src={user.photo} />
        <div>
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>
      </div>

      <div className="sidebar__profileIcons">
        <Tooltip title={micOn ? "Voice On" : "Voice Off"}>
          {micOn ? (
            <MicIcon onClick={() => setMicOn(!micOn)} />
          ) : (
            <MicOffOutlinedIcon onClick={() => setMicOn(!micOn)} />
          )}
        </Tooltip>
        <Tooltip title={headphonesOn ? "Audio On" : "Audio Off"}>
          {headphonesOn ? (
            <HeadphonesIcon onClick={() => setHeadphonesOn(!headphonesOn)} />
          ) : (
            <HeadsetOffOutlinedIcon onClick={() => setHeadphonesOn(!headphonesOn)} />
          )}
        </Tooltip>
        <Tooltip title="Settings">
          <SettingsIcon />
        </Tooltip>
      </div>
    </div>
  );
}

export default UserProfile;
