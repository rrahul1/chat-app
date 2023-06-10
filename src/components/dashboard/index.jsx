import React from "react";
import { Button, Divider, Drawer } from "rsuite";
import { useProfile } from "../../context/profile.context";
import EditableInput from "../EditableInput";

function Dashboard({ handleSignOut }) {
  const { profile } = useProfile();

  const handleSave = async (newData) => {
    console.log(newData);
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile && profile.name}</h3>
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          handleSave={handleSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="red" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
}

export default Dashboard;
