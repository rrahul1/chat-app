import { auth, database } from "../misc/firebase";

const { createContext, useState, useContext, useEffect } = require("react");

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let userRef;
    const authUnsub = auth.onAuthStateChanged((authObj) => {
      if (!authObj?.emailVerified) {
        authObj?.sendEmailVerification();
      }
      if (authObj) {
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on("value", (snap) => {
          const { name, createdAt } = snap?.val();

          const data = {
            name,
            createdAt,
            uid: authObj?.uid,
            email: authObj?.email,
            password: authObj?.password,
            isEmailVerified: authObj?.emailVerified,
          };
          setProfile(data);
        });
      } else {
        if (userRef) {
          userRef.off();
        }

        setProfile(null);
      }
    });

    return () => {
      authUnsub();

      if (userRef) {
        userRef.off();
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
