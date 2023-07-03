import React, { useState } from "react";
import { Alert, Button, Icon, InputGroup, Modal, Uploader } from "rsuite";
import { useModalState } from "../../../misc/custom-hooks";
import { storage } from "../../../misc/firebase";
import { useParams } from "react-router-dom";

const MAX_FILE_SIZE = 1000 * 1024 * 5;

const AttachmentBtn = ({ afterUpload }) => {
  const { chatId } = useParams();
  const { isOpen, open, close } = useModalState();

  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (fileArr) => {
    const filtered = fileArr
      .filter((el) => el.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);

    setFileList(filtered);
  };

  const handleUploadFile = async () => {
    try {
      const uploadPromises = fileList.map((file) => {
        return storage
          .ref(`/chat/${chatId}`)
          .child(Date.now() + file.name)
          .put(file.blobFile, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });
      });

      const uploadSnaps = await Promise.all(uploadPromises);

      const shapePromises = uploadSnaps.map(async (snap) => {
        return {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
      });

      const files = await Promise.all(shapePromises);
      await afterUpload(files);
      setIsLoading(false);
      close();
    } catch (err) {
      Alert.error(err.message, 3000);
    }
  };

  return (
    <>
      <InputGroup.Button onClick={open}>
        <Icon icon="attachment" />
      </InputGroup.Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Uploader
            autoUpload={false}
            action=""
            fileList={fileList}
            onChange={handleFileSelect}
            multiple
            listType="picture-text"
            className="w-100"
            disabled={isLoading}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button block disabled={isLoading} onClick={handleUploadFile}>
            Send to chat
          </Button>
          <div className="text-right mt-2">
            <small>* only files less than 5mb are allowed</small>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AttachmentBtn;
