import React from "react";
import { Nav } from "rsuite";
import RoomItem from "./RoomItem";

function ChatRoomList({ aboveEleHeight }) {
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveEleHeight}px)`,
      }}
    >
      <Nav.Item>
        <RoomItem />
      </Nav.Item>
    </Nav>
  );
}

export default ChatRoomList;
