import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectOnlineUsers,
  updateOnlineUsers,
} from "../features/userSlice";
import "./UsersOnlineList.css";
import { Tooltip } from "@mui/material";
import { collection, onSnapshot, query, doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import DirectChat from "../Chat/DirectChat";
import BotManager from "../Bots/BotsManager";

function UsersOnlineList(props) {
  const dispatch = useDispatch();
  const onlineUsers = useSelector(selectOnlineUsers);
  const currentUser = useSelector(selectUser);
  const [selectedUser, setSelectedUser] = useState(null);
  const [directMessages, setDirectMessages] = useState([]);
  const [isBotChatOpen, setIsBotChatOpen] = useState(false);
  const [botsRendered, setBotsRendered] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "onlineUsers"));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const onlineUsersSnapshot = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const onlineUsersData = [];
      for (const user of onlineUsersSnapshot) {
        if (user.online) {
          const docRef = doc(db, "users", user.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            onlineUsersData.push({ id: docSnap.id, ...docSnap.data() });
          }
        }
      }
      dispatch(updateOnlineUsers(onlineUsersData));
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleSendMessage = (messageObj) => {
    if (
      messageObj &&
      messageObj.content &&
      typeof messageObj.content === "string" &&
      messageObj.content.trim()
    ) {
      setDirectMessages((prevMessages) => {
        const newMessages = [...prevMessages, messageObj];

        if (selectedUser && selectedUser.isBot) {
          const botReply = "Bot reply to your message";
          newMessages.push({ content: botReply, sender: "bot" });
        }

        return newMessages;
      });
    }
  };

  useEffect(() => {
    console.log("selectedUser state updated: ", selectedUser?.displayName);
  }, [selectedUser]);

  const handleUserClick = (bot) => {
    console.log("Selected bot: ", bot.displayName);

    setDirectMessages([]);

    setSelectedUser(bot);
    setIsBotChatOpen(true);

    setDirectMessages([
      { content: `Hello ${currentUser.displayName}!`, sender: "bot" },
    ]);
  };

  useEffect(() => {
    props.onUsersRendered(onlineUsers.length + botsRendered);
  }, [onlineUsers, botsRendered, props]);

  return (
    <div className="usersOnline">
      {selectedUser && (
        <DirectChat
          user={selectedUser}
          messages={directMessages}
          onSendMessage={handleSendMessage}
          onClose={() => setSelectedUser(null)}
          setDirectMessages={setDirectMessages}
        />
      )}

      {onlineUsers.map((user) => (
        <div
          className={`userOnline ${user.isBot ? "" : "notClickable"} ${
            user.id === currentUser.uid ? "disabled" : ""
          }`}
          key={user.id}
          onClick={user.isBot ? () => handleUserClick(user) : null}
        >
          <div className="userOnline__content">
            <img src={user.photo} alt={user.displayName} />
            <h4>{user.displayName}</h4>
          </div>
          <Tooltip title="User online">
            <div className="greenDot"></div>
          </Tooltip>
        </div>
      ))}

      <BotManager
        onBotClick={handleUserClick}
        onBotsRendered={setBotsRendered}
      />
    </div>
  );
}

export default UsersOnlineList;
