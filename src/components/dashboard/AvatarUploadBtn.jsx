import React, { useState } from "react";
import { Alert, Button, Modal } from "rsuite";
import AvatarEditor from "react-avatar-editor";
import { useModalState } from "../../misc/custom-hooks";

const fileTypes = ".png, .jpeg, .jpg";

const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];

const validFile = (file) => {
  return acceptedFileTypes.includes(file.type);
};

function AvatarUploadBtn() {
  const { isOpen, open, close } = useModalState();

  const [img, setImg] = useState(null);

  const handleFile = (e) => {
    const currentFile = e.target.files;

    if (currentFile.length === 1) {
      const file = currentFile[0];

      if (validFile(file)) {
        setImg(file);
        open();
      } else {
        Alert.warning(`File type not supported ${file.type}`, 4000);
      }
    }
  };

  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileTypes}
            onChange={handleFile}
          />
        </label>

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h100">
              {img && (
                <AvatarEditor
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost">
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AvatarUploadBtn;
