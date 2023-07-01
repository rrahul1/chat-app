import React, { memo } from "react";
import { Alert, Button, Drawer } from "rsuite";
import { useMediaQuery, useModalState } from "../../../misc/custom-hooks";
import EditableInput from "../../../components/EditableInput";
import { useCurrentRoom } from "../../../context/current-room.context";
import { database } from "../../../misc/firebase";
import { useParams } from "react-router-dom";

const EditRoomDrawer = () => {
  const { open, isOpen, close } = useModalState();

  const isMobile = useMediaQuery("(max-width: 992px)");

  const { chatId } = useParams();

  const name = useCurrentRoom((v) => v?.name);
  const description = useCurrentRoom((v) => v?.description);

  const updateData = (key, value) => {
    database
      .ref(`/rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        Alert.success("SucessFully Updated", 4000);
      })
      .catch((err) => {
        Alert.error(err.message, 4000);
      });
  };

  const handleNameSave = (newName) => {
    updateData("name", newName);
  };

  const handleDescriptionSave = (newDesc) => {
    updateData("description", newDesc);
  };

  return (
    <div>
      <Button className="br-circle" size="sm" color="red" onClick={open}>
        A
      </Button>

      <Drawer full={isMobile} show={isOpen} onHide={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput
            initialValue={name}
            handleSave={handleNameSave}
            label={<h6 className="mb-2">Name</h6>}
            emptyMsg="Name cannot be empty"
          />
          <EditableInput
            componentClass="textarea"
            rows={5}
            initialValue={description}
            handleSave={handleDescriptionSave}
            emptyMsg="Description cannot be empty"
            wrapperClass="mt-3"
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default memo(EditRoomDrawer);
