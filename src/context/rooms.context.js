import React, { useEffect, useState, createContext, useContext } from "react";
import { database } from "../misc/firebase";
import { transformArray } from "../misc/helpers";

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomListRef = database.ref("rooms");

    roomListRef.on("value", (snap) => {
      const data = transformArray(snap.val());

      setRooms(data);
    });

    return () => {
      roomListRef.off();
    };
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);
