import React, { useCallback } from "react";
import { Alert, Button, Drawer, Icon } from "rsuite";
import { useMediaQuery, useModalState } from "../../misc/custom-hooks";
import Dashboard from ".";
import { auth, database } from "../../misc/firebase";
import { isOfflineForDatabase } from "../../context/profile.context";

function DashboardToggle() {
  const { isOpen, open, close } = useModalState();
  const isMobile = useMediaQuery("(max-width: 992px)");

  const handleSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();

        Alert.info("Signed Out", 6000);

        close();
      })
      .catch((err) => {
        Alert.error(err.message, 4000);
      });
  }, [close]);

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard handleSignOut={handleSignOut} />
      </Drawer>
    </>
  );
}

export default DashboardToggle;
