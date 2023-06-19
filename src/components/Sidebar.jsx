import React, { useEffect, useRef, useState } from "react";
import DashboardToggle from "./dashboard/DashboardToggle";
import CreateRoomBtn from "./dashboard/CreateRoomBtn";
import { Divider } from "rsuite";
import ChatRoomList from "./rooms/ChatRoomList";

function Sidebar() {
  const topSideBarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSideBarRef.current) {
      setHeight(topSideBarRef.current.scrollHeight);
    }
  }, [topSideBarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={topSideBarRef}>
        <DashboardToggle />
        <CreateRoomBtn />
        <Divider>Join Conversation</Divider>
      </div>
      <ChatRoomList aboveEleHeight={height} />
    </div>
  );
}

export default Sidebar;
