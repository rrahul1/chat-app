import React, { useRef, useState } from "react";
import { Alert, Button, Modal } from "rsuite";
import AvatarEditor from "react-avatar-editor";
import { useModalState } from "../../misc/custom-hooks";
import { database, storage } from "../../misc/firebase";
import { useProfile } from "../../context/profile.context";
import ProfileAvatar from "./ProfileAvatar";

const fileTypes = ".png, .jpeg, .jpg";

const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];

const validFile = (file) => {
  return acceptedFileTypes.includes(file.type);
};

const getBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("File process error"));
      }
    });
  });
};

function AvatarUploadBtn() {
  const { isOpen, open, close } = useModalState();

  const [loading, setLoading] = useState(false);

  const { profile } = useProfile();

  const avatarEditorRef = useRef();

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

  const handleFileUpload = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    setLoading(true);

    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profiles/${profile.uid}`)
        .child("avatar");

      const uploadResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadResult.ref.getDownloadURL();

      const userAvatarRef = database
        .ref(`/profiles/${profile.uid}`)
        .child("avatar");

      userAvatarRef.set(downloadUrl);

      setLoading(false);

      Alert.info("Avatar has been uploaded", 4000);
    } catch (err) {
      setLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />

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
                  ref={avatarEditorRef}
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
            <Button
              block
              appearance="ghost"
              onClick={handleFileUpload}
              disabled={loading}
            >
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AvatarUploadBtn;
