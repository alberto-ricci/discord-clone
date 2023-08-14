import { getDatabase, ref, onValue, get } from "firebase/database";
import { store } from "../app/store";
import { updateOnlineUsers } from "../features/userSlice";

const database = getDatabase();
const onlineRef = ref(database, "onlineUsers");

onValue(onlineRef, (snapshot) => {
  const onlineUsers = snapshot.val();

  const usersOnline = Object.keys(onlineUsers).filter(
    (userId) => onlineUsers[userId] === true
  );

  const userRefs = usersOnline.map((userId) =>
    ref(database, `users/${userId}`)
  );
  const userPromises = userRefs.map((userRef) => get(userRef));
  Promise.all(userPromises).then((snapshots) => {
    const users = snapshots.map((snapshot) => snapshot.val());
    store.dispatch(updateOnlineUsers(users));
  });
});
