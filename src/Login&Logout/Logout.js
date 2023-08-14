import React, { useEffect } from "react";
import "./Logout.css";
import { useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { logout, selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

function Logout() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const auth = getAuth();

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        updateOnlineStatus(false);
      })
      .catch((error) => console.error(error));
  };

  const updateOnlineStatus = (status) => {
    setDoc(doc(db, "onlineUsers", user.uid), { online: status });
  };

  useEffect(() => {
    const handleWindowClose = () => {
      updateOnlineStatus(false);
    };

    window.addEventListener("beforeunload", handleWindowClose);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, []);

  return (
    <button className="logout__button" onClick={onLogout}>
      Logout
    </button>
  );
}

export default Logout;
