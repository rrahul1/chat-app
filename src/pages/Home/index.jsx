import React, { useEffect } from "react";
import { useProfile } from "../../context/profile.context";
import { useNavigate } from "react-router-dom";
import GridLayout from "./GridLayout";
import { RoomsProvider } from "../../context/rooms.context";

function Home() {
  const navigate = useNavigate();
  const { profile } = useProfile();

  useEffect(() => {
    if (!profile) {
      return navigate("/signin");
    }
  }, [navigate, profile]);

  return (
    <>
      <RoomsProvider>
        <GridLayout />
      </RoomsProvider>
    </>
  );
}

export default Home;
