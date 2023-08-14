import React from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import ChatMessages from './ChatMessages';
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import {  selectChannelName, selectChannelId } from "../features/appSlice";
import { selectUser } from "../features/userSlice";
import { useState } from "react";

function Chat() {
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName)
  const channelId = useSelector(selectChannelId) 
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} handleSearch={handleSearch} />
      <ChatMessages channelId={channelId} searchTerm={searchTerm} />
      <ChatInput channelId={channelId} /> 
    </div>
  );
}

export default Chat;