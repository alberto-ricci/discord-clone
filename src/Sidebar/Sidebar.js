import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PeopleIcon from "@mui/icons-material/People";
import SidebarChannel from "./SidebarChannel";
import UsersOnlineList from "./UsersOnlineList";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CallIcon from "@mui/icons-material/Call";
import UserProfile from "./UserProfile";
import ChannelsOptions from "./ChannelsOptions";
import Logout from "../Login&Logout/Logout";
import ChannelUnreadCount from "./ChannelUnreadCount";
import Tooltip from "@mui/material/Tooltip";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import AddChannel from "./AddChannel";
import { useSelector } from "react-redux";
import { selectOnlineUsers } from "../features/userSlice";

function Sidebar() {
  const [channels, setChannels] = useState([]);
  const onlineUsers = useSelector(selectOnlineUsers);
  const [botsOnline, setBotsOnline] = useState([]);
  const totalOnlineCount = onlineUsers.length + botsOnline.length;
  const [totalUsersRendered, setTotalUsersRendered] = useState(0);

  useEffect(() => {
    const channelCollection = collection(db, "channels");
    const unsubscribe = onSnapshot(query(channelCollection), (snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, [db]);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Discord Clone - IT School Final Project</h3>
      </div>
      <div className="sidebar__section">
        <div className="sidebar__header">
          <Tooltip title="Channels">
            <ExpandMoreIcon />
          </Tooltip>
          <h4>Channels</h4>
          <AddChannel />
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({ id, data: { channelName } }) => (
            <div className="sidebar__channelItem" key={id}>
              <div className="sidebar__channelContent">
                <SidebarChannel id={id} channel={channelName} />
                <ChannelUnreadCount channelId={id} />
                <ChannelsOptions channelId={id} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar__section">
        <div className="sidebar__header">
          <Tooltip title="Users online">
            <ExpandMoreIcon />
          </Tooltip>
          <h4>Users online ({totalUsersRendered})</h4>
          <Tooltip title="Users List">
            <PeopleIcon />
          </Tooltip>
        </div>
        <div className="sidebar__usersList">
          <UsersOnlineList
            setBotsOnline={setBotsOnline}
            onUsersRendered={(count) => setTotalUsersRendered(count)}
          />
        </div>
      </div>

      <div className="sidebar__voiceWrapper">
        <div className="sidebar__voice">
          <SignalCellularAltIcon
            className="sidebar__voiceIcon"
            fontSize="large"
          />

          <div className="sidebar__voiceInfo">
            <h3>Voice Connected</h3>
            <p>Stream</p>
          </div>

          <div className="sidebar__voiceIcons">
            <Tooltip title="IT School, Web Development Course 2023, Final Project - Discord Clone made using React, Redux and Firebase. Made by Alberto Ricci.">
              <InfoOutlinedIcon className="voice-icon" />
            </Tooltip>
            <Tooltip title="Call">
              <CallIcon className="voice-icon" />
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="sidebar__userProfile">
        <UserProfile />
      </div>
      <div className="sidebar__logout">
        <Tooltip title="Logout">
          <Logout />
        </Tooltip>
      </div>
    </div>
  );
}

export default Sidebar;
