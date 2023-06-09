import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from "rsuite";
import firebase from "firebase/app";
import { useModalState } from "../../misc/custom-hooks";
import { database, auth } from "../../misc/firebase";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Room name is required"),
  description: StringType().isRequired("Room description is required"),
});

const INITIAL_FORM = {
  name: "",
  description: "",
};

function CreateRoomBtn() {
  const { isOpen, open, close } = useModalState();

  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleFormChange = useCallback((value) => {
    setFormValue(value);
  }, []);

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }

    setLoading(true);

    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth?.currentUser.uid]: true,
      },
    };

    try {
      await database.ref("rooms").push(newRoomData);

      Alert.info(`${formValue.name} has been created`, 4000);

      setLoading(false);

      setFormValue(INITIAL_FORM);

      close();
    } catch (err) {
      setLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <div className="mt-1">
      <Button block color="cyan" onClick={open}>
        <Icon icon="creative" /> Create new chat room
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={handleFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room Name</ControlLabel>
              <FormControl name="name" placeholder="Enter chat room name...." />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                name="description"
                componentClass="textarea"
                rows={5}
                placeholder="Enter chat room description...."
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="default"
            onClick={handleSubmit}
            disabled={loading}
          >
            Create chat room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateRoomBtn;
