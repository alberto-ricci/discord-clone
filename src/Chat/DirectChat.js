import React, { useState, useRef, useEffect } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./DirectChat.css";
import BotChatHandler from "../Bots/BotChatHandler";

function DirectChat({
  user,
  messages,
  onSendMessage,
  onClose,
  setDirectMessages,
}) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const botChatHandler = new BotChatHandler("YourBotName");

  useEffect(() => {
    if (user) {
      console.log("Dialog Opened with user:", user.displayName);
    } else {
      console.log("Dialog Closed");
    }
  }, [user]);

  const handleClose = () => {
    console.log("Attempting to close dialog...");
    onClose();

    setDirectMessages([]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendCurrentMessage = () => {
    if (message.trim()) {
      onSendMessage({ content: message, sender: "user" });
      setMessage("");

      const delay = Math.floor(Math.random() * 2000) + 1000;
      setTimeout(() => {
        const botReply = botChatHandler.getReplyFromBot(message, user?.name);
        console.log("Bot Reply:", botReply);
        onSendMessage({ content: botReply, sender: "bot" });
      }, delay);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendCurrentMessage();
    }
  };

  return (
    <Dialog open={!!user} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={user?.avatar}
              alt={user?.name}
              style={{
                marginRight: "8px",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                objectFit: "cover",
              }}
            />
            <span style={{ fontWeight: "bold" }}>{user?.name}</span>
          </div>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent>
        <div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === "user" ? "sender" : "receiver"}
            >
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message"
          />
          <Tooltip title="Send message">
            <IconButton onClick={sendCurrentMessage}>
              <SendRoundedIcon />
            </IconButton>
          </Tooltip>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DirectChat;
