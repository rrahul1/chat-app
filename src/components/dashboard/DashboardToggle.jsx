import React, { useCallback } from "react";
import { Alert, Button, Drawer, Icon } from "rsuite";
import { useMediQuery, useModalState } from "../../misc/custom-hooks";
import Dashboard from ".";
import { auth } from "../../misc/firebase";

function DashboardToggle() {
  const { isOpen, open, close } = useModalState();
  const isMobile = useMediQuery("(max-width: 992px)");

  const handleSignOut = useCallback(() => {
    auth.signOut();

    Alert.info("Signed Out", 6000);

    close();
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
