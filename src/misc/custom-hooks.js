import { useCallback, useEffect, useState } from "react";
import { database } from ".././misc/firebase";

export function useModalState(defaultValue = false) {
  const [isOpen, setIsOpem] = useState(defaultValue);

  const open = useCallback(() => setIsOpem(true), []);
  const close = useCallback(() => setIsOpem(false), []);

  return { isOpen, open, close };
}

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = (evt) => setMatches(evt.matches);

    queryList.addEventListener("click", listener);

    return () => queryList.removeEventListener("click", listener);
  }, [query]);

  return matches;
};

export function usePresence(uid) {
  const [presence, setPrensence] = useState(null);

  useEffect(() => {
    const userStatusRef = database.ref(`/status/${uid}`);

    userStatusRef.on("value", (snap) => {
      if (snap.exists()) {
        const data = snap.val();

        setPrensence(data);
      }
    });

    return () => {
      userStatusRef.off();
    };
  }, [uid]);

  return presence;
}
