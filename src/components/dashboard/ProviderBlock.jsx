import React, { useState } from "react";
import { auth } from "../../misc/firebase";
import { Alert, Button, Icon, Tag } from "rsuite";
import firebase from "firebase/app";

function ProviderBlock() {
  const [connected, setConnected] = useState({
    "google.com": auth.currentUser?.providerData.some(
      (data) => data.providerId === "google.com"
    ),
    "facebook.com": auth.currentUser?.providerData.some(
      (data) => data.providerId === "facebook.com"
    ),
  });

  const updateConnected = (providerID, value) => {
    setConnected((p) => {
      return {
        ...p,
        [providerID]: value,
      };
    });
  };

  const unLink = async (providerId) => {
    try {
      if (auth.currentUser?.providerData.length === 1) {
        throw new Error(`You cannot disconnect from ${providerId}`);
      }

      await auth.currentUser.unlink(providerId);

      updateConnected(providerId, false);

      Alert(`Disconnected from ${providerId}`, 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const unLinkFacebook = () => {
    unLink("facebook.com");
  };

  const unLinkGoogle = () => {
    unLink("google.com");
  };

  const link = async (provider) => {
    try {
      await auth.currentUser.linkWithPopup(provider);

      Alert.info(`Linked to ${provider?.providerId}`, 4000);

      updateConnected(provider?.providerId, true);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };

  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div>
      {connected["google.com"] && (
        <Tag color="red" closable onClose={unLinkGoogle}>
          <Icon icon="google" /> connected
        </Tag>
      )}

      {connected["facebook.com"] && (
        <Tag color="blue" closable onClose={unLinkFacebook}>
          <Icon icon="facebook" /> connected
        </Tag>
      )}

      <div className="mt-2">
        {!connected["google.com"] && (
          <Button block color="red" onClick={linkGoogle}>
            <Icon icon="google" /> Link to google
          </Button>
        )}

        {!connected["facebook.com"] && (
          <Button block color="blue" onClick={linkFacebook}>
            <Icon icon="facebook" /> Link to facebook
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProviderBlock;
