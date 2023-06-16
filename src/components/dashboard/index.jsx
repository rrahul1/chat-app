import React from "react";
import { Alert, Button, Divider, Drawer } from "rsuite";
import { useProfile } from "../../context/profile.context";
import EditableInput from "../EditableInput";
import { database } from "../../misc/firebase";
import ProviderBlock from "./ProviderBlock";

function Dashboard({ handleSignOut }) {
  const { profile } = useProfile();

  const handleSave = async (newData) => {
    const userNicknameRef = database
      .ref(`/profiles/${profile.uid}`)
      .child("name");

    try {
      await userNicknameRef.set(newData);
      Alert.success("Nickname has been updated");
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile?.name}</h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile?.name}
          handleSave={handleSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="green" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
}

export default Dashboard;
