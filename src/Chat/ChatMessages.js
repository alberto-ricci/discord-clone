import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  doc,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import "./ChatMessages.css";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function ChatMessages({ channelId, searchTerm }) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const currentUser = useSelector(selectUser);
  const userId = currentUser?.uid;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (channelId) {
      const q = query(
        collection(db, "channels", channelId, "messages"),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });

      return () => {
        unsubscribe();
      };
    }
  }, [channelId]);

  useEffect(scrollToBottom, [messages]);

  const filteredMessages = messages.filter((message) =>
    message.data.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditMessage = async (messageId, newContent) => {
    const messageRef = doc(db, "channels", channelId, "messages", messageId);
    await updateDoc(messageRef, {
      message: newContent,
      edited: true,
    });
  };

  const handleDeleteMessage = async (messageId) => {
    const messageRef = doc(db, "channels", channelId, "messages", messageId);
    await deleteDoc(messageRef);
  };

  return (
    <div className="chat__messages">
      {filteredMessages.map((message) => (
        <Message
          key={message.id}
          messageId={message.id}
          channelId={channelId}
          userId={userId}
          message={message.data.message}
          timestamp={message.data.timestamp}
          user={message.data.user}
          onEditMessage={handleEditMessage}
          onDeleteMessage={handleDeleteMessage}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessages;
