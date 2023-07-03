import React from "react";
import { useModalState } from "../../../misc/custom-hooks";
import { Modal } from "rsuite";

const ImgBtn = ({ src, fileName }) => {
  const { open, close, isOpen } = useModalState();

  return (
    <>
      <input
        type="image"
        src={src}
        onClick={open}
        alt="file"
        className="mw-100 mh-100 w-auto"
      />
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{fileName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img src={src} alt={fileName} height="100%" width="100%" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a href={src} target="blank" rel="noopener noreferrer">
            View Original
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImgBtn;
