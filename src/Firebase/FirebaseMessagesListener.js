import { useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "./app/store";
import { incrementUnread } from "./features/messageSlice";
import { selectChannelId, selectChannelIds } from "./features/appSlice";
import { db } from "./Firebase";
import {
  onSnapshot,
  doc,
  orderBy,
  query,
  collection,
} from "firebase/firestore";

const FirebaseMessagesListener = () => {
  const channelIds = useSelector(selectChannelIds);
  useEffect(() => {
    const channelUnsubscribes = {};
    channelIds.forEach((channelId) => {
      if (!channelUnsubscribes[channelId]) {
        const unsubscribe = onSnapshot(
          query(
            collection(db, `channels/${channelId}/messages`),
            orderBy("timestamp")
          ),
          (messageSnapshot) => {
            messageSnapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const currentChannelId = selectChannelId(store.getState());
                if (currentChannelId !== channelId) {
                  store.dispatch(incrementUnread({ channelId }));
                }
              }
            });
          }
        );
        channelUnsubscribes[channelId] = unsubscribe;
      }
    });

    // Cleanup
    return () => {
      Object.values(channelUnsubscribes).forEach((unsubscribe) =>
        unsubscribe()
      );
    };
  }, [channelIds]);

  return null;
};

export default FirebaseMessagesListener;
