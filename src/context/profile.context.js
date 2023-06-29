import { auth, database } from "../misc/firebase";
import firebase from "firebase/app";
const { createContext, useState, useContext, useEffect } = require("react");

export const isOfflineForDatabase = {
  state: "offline",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: "online",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let userRef;
    let userStatusRef;

    const authUnsub = auth.onAuthStateChanged((authObj) => {
      if (!authObj?.emailVerified) {
        authObj?.sendEmailVerification();
      }
      if (authObj) {
        userStatusRef = database.ref(`/status/${authObj?.uid}`);

        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on("value", (snap) => {
          const { name, createdAt, avatar } = snap?.val();

          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj?.uid,
            email: authObj?.email,
            password: authObj?.password,
            isEmailVerified: authObj?.emailVerified,
          };
          setProfile(data);
        });

        database.ref(".info/connected").on("value", (snap) => {
          if (snap.val() === false) {
            return;
          }

          userStatusRef
            .onDisconnect()
            ?.set(isOfflineForDatabase)
            .then(() => {
              userStatusRef.set(isOnlineForDatabase);
            });
        });
      } else {
        if (userRef) {
          userRef.off();
        }

        if (userStatusRef) {
          userStatusRef.off();
        }

        setProfile(null);
      }
    });

    return () => {
      authUnsub();

      if (userRef) {
        userRef.off();
      }

      if (userStatusRef) {
        userStatusRef.off();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
