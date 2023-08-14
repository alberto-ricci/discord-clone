import React from "react";
import "./Message.css";
import { Avatar } from "@mui/material";
import Linkify from "react-linkify";
import MessageOptions from "./MessageOptions";

function Message({
  messageId,
  channelId,
  userId,
  message,
  timestamp,
  user,
  onEditMessage,
  onDeleteMessage,
}) {
  let dateString = "";
  if (timestamp) {
    const date = timestamp.toDate();
    dateString = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  const renderMessageContent = () => {
    if (message.startsWith("https://media.giphy.com/")) {
      return <img src={message} alt="chat gif" className="message__gif" />;
    } else {
      return (
        <Linkify properties={{ target: "_blank", className: "message__link" }}>
          <p>{message}</p>
        </Linkify>
      );
    }
  };

  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message__info">
        <div className="message__header">
          <h4>{user.displayName}</h4>
          <div className="message__extra">
            <span className="message__timestamp">{dateString}</span>
            <MessageOptions
              messageId={messageId}
              channelId={channelId}
              userId={userId}
            />
          </div>
        </div>
        {renderMessageContent()}
      </div>
    </div>
  );
}

export default Message;
