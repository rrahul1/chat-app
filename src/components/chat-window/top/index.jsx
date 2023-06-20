import React, { memo } from "react";
import { useCurrentRoom } from "../../../context/current-room.context";
import { ButtonToolbar, Icon } from "rsuite";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../../../misc/custom-hooks";
import RoomInfoBtnModal from "./RoomInfoBtnModal";

const Top = () => {
  const roomName = useCurrentRoom((v) => v?.name);

  const isMobile = useMediaQuery("(max-width: 992px)");

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          <Icon
            componentClass={Link}
            to="/"
            icon="arrow-circle-left"
            size="2x"
            className={
              isMobile
                ? "dd-inline-block p-0 mr-2 text-blue link-unstyled"
                : "d-none"
            }
          />
          <span className="text-disappear">{roomName}</span>
        </h4>

        <ButtonToolbar className="ws-nowrap">Todo</ButtonToolbar>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <span>todo</span>
        <RoomInfoBtnModal />
      </div>
    </div>
  );
};

export default memo(Top);
