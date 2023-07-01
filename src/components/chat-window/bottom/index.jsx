import React, { useCallback, useState } from "react";
import { Alert, Icon, Input, InputGroup } from "rsuite";
import firebase from "firebase/app";
import { useParams } from "react-router-dom";
import { useProfile } from "../../../context/profile.context";
import { database } from "../../../misc/firebase";

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile?.name,
      uid: profile?.uid,
      createdAt: profile?.createdAt,
      ...(profile.avatar ? { avatar: profile?.avatar } : {}),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    likeCount: 0,
  };
}

const Bottom = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { chatId } = useParams();
  const { profile } = useProfile();

  const handleInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const handleSendClick = async () => {
    if (input.trim() === "") {
      return;
    }

    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    const updates = {};

    const msgId = database.ref("messages").push().key;

    updates[`/messages/${msgId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: msgId,
    };

    setLoading(true);

    try {
      await database.ref().update(updates);

      setInput("");
      setLoading(false);
    } catch (err) {
      setLoading(false);

      Alert.error(err.message, 400);
    }
  };

  const handleKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      handleSendClick();
    }
  };

  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Write a new message..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <InputGroup.Button onClick={handleSendClick} disabled={loading}>
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default Bottom;
