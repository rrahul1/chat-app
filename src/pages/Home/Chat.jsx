import React, { useEffect, useState } from "react";
import ChatTop from "../../components/chat-window/top";
import Messages from "../../components/chat-window/messages";
import ChatBottom from "../../components/chat-window/bottom";
import { useParams } from "react-router-dom";
import { useRooms } from "../../context/rooms.context";
import { Loader } from "rsuite";
import { CurrentRoomProvider } from "../../context/current-room.context";
import { transformToArray } from "../../misc/helpers";
import { auth } from "../../misc/firebase";

function Chat() {
  const { chatId } = useParams();
  const [currentRoom, setCurrentRoom] = useState(null);

  const rooms = useRooms();

  useEffect(() => {
    if (chatId) {
      setCurrentRoom(
        rooms?.filter((ele) => {
          return ele?.id[0] === chatId;
        })
      );
    }
  }, [rooms, chatId]);

  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />;
  }

  const name = currentRoom && currentRoom[0]?.name;
  const description = currentRoom && currentRoom[0]?.description;

  const admins = transformToArray(currentRoom && currentRoom[0].admins);

  const isAdmin = admins.includes(auth?.currentUser.uid);

  const currentRoomData = {
    name,
    description,
    admins,
    isAdmin,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      {currentRoom && currentRoom ? (
        <>
          <div className="chat-top">
            <ChatTop />
          </div>
          <div className="chat-middle">
            <Messages />
          </div>
          <div className="chat-bottom">
            <ChatBottom />
          </div>
        </>
      ) : (
        <h6 className="text-center mt-page">Select chat to continue</h6>
      )}
    </CurrentRoomProvider>
  );
}

export default Chat;
