import React, { useState } from "react";
import "./ChatHeader.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import HelpIcon from "@mui/icons-material/Help";
import Tooltip from "@mui/material/Tooltip";

function ChatHeader({ channelName, handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash">#</span>
          {channelName}
        </h3>
      </div>

      <div className="chatHeader__right">
        <Tooltip title="Notifications">
          <NotificationsIcon />
        </Tooltip>

        <Tooltip title="Edit location">
          <EditLocationIcon />
        </Tooltip>

        <Tooltip title="People">
          <PeopleAltRoundedIcon />
        </Tooltip>

        <div className="chatHeader__search">
          <input
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <SearchRoundedIcon />
        </div>

        <Tooltip title="Send">
          <SendRoundedIcon />
        </Tooltip>

        <Tooltip title="Help">
          <HelpIcon />
        </Tooltip>
      </div>
    </div>
  );
}

export default ChatHeader;
