import { useEffect } from "react";
import { store } from "./app/store";
import { addChannel, removeChannel } from "./features/channelSlice";
import { db } from "./Firebase";
import { onSnapshot, collection } from "firebase/firestore";

const FirebaseChannelListener = () => {
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "channels"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          store.dispatch(
            addChannel({ channelId: change.doc.id, ...change.doc.data() })
          );
        } else if (change.type === "removed") {
          store.dispatch(removeChannel(change.doc.id));
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};

export default FirebaseChannelListener;
