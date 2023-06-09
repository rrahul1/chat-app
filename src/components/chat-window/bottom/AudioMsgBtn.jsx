import React, { useCallback, useState } from "react";
import { ReactMic } from "react-mic";
import { Alert, Icon, InputGroup } from "rsuite";
import { storage } from "../../../misc/firebase";
import { useParams } from "react-router-dom";

const AudioMsgBtn = ({ afterUpload }) => {
  const { chatId } = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const [isLoding, setIsLoading] = useState(false);

  const handleAudio = () => {
    setIsRecording((p) => !p);
  };

  const handleUploadAudio = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const snaps = await storage
          .ref(`/chat/${chatId}`)
          .child(`audio_${Date.now()}.mp3`)
          .put(data.blob, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });

        const file = {
          contentType: snaps.metadata.contentType,
          name: snaps.metadata.name,
          url: await snaps.ref.getDownloadURL(),
        };

        setIsLoading(false);
        afterUpload([file]);
      } catch (error) {
        setIsLoading(false);
        Alert.error(error.message);
      }
    },
    [afterUpload, chatId]
  );

  return (
    <>
      <InputGroup.Button
        onClick={handleAudio}
        disabled={isLoding}
        className={isLoding ? "animate-blink" : ""}
      >
        <Icon icon="microphone" />
        <ReactMic
          record={isRecording}
          className="d-none"
          onStop={handleUploadAudio}
          mimeType="audio/mp3"
        />
      </InputGroup.Button>
    </>
  );
};

export default AudioMsgBtn;
