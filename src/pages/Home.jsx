import React, { useEffect } from "react";
import { useProfile } from "../context/profile.context";
import { useNavigate } from "react-router-dom";
import { Container, Loader } from "rsuite";

function Home() {
  const { loading } = useProfile();
  const { profile } = useProfile();

  const navigate = useNavigate();

  useEffect(() => {
    if (loading && !profile) {
      return (
        <Container>
          <Loader center vertical size="md" content="Loading" speed="slow" />
        </Container>
      );
    }

    if (!profile && !loading) {
      return navigate("/signin");
    }
  }, [loading, navigate, profile]);

  return <div>Home</div>;
}

export default Home;
