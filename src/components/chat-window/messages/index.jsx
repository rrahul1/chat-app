import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../../../misc/firebase";
import { transformArray } from "../../../misc/helpers";
import MessageItem from "./MessageItem";
import { Alert } from "rsuite";

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messageRef = database.ref("messages");
    messageRef
      .orderByChild("roomId")
      .equalTo(chatId)
      .on("value", (snap) => {
        const data = transformArray(snap.val());

        setMessages(data);
      });

    return () => {};
  }, [chatId]);

  const handleAdmin = useCallback(
    async (uid) => {
      let alertMsg;
      const adminRef = database.ref(`/rooms/${chatId}/admins`);

      await adminRef.transaction((admins) => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = "Admin permission removed";
          } else {
            admins[uid] = true;
            alertMsg = "Admin permission granted";
          }
        }
        return admins;
      });

      Alert.info(alertMsg, 4000);
    },
    [chatId]
  );

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages &&
        messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} handleAdmin={handleAdmin} />
        ))}
    </ul>
  );
};

export default Messages;
