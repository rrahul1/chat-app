import React from "react";
import ChatTop from "../../components/chat-window/top";
import Messages from "../../components/chat-window/messages";
import ChatBottom from "../../components/chat-window/bottom";
import { useParams } from "react-router-dom";
import { useRooms } from "../../context/rooms.context";
import { Loader } from "rsuite";

function Chat() {
  const { chatId } = useParams();

  console.log(typeof chatId, "gasdh");

  const rooms = useRooms();

  console.log(typeof rooms?.id);

  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />;
  }

  const currentRoom = rooms.map((room) =>
    room.includes((item) => item.id === chatId)
  );

  console.log(currentRoom);
  return (
    <div>
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
        <h6>Chat Not Found</h6>
      )}
    </div>
  );
}

export default Chat;
