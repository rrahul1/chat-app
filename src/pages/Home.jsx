import React, { useEffect } from "react";
import { useProfile } from "../context/profile.context";
import { useNavigate } from "react-router-dom";

import GridLayout from "./Home";

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
      <GridLayout />
    </>
  );
}

export default Home;
