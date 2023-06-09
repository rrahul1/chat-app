import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useProfile } from "../context/profile.context";
import { Container, Loader } from "rsuite";

function PrivateRoute({ children, ...routeProp }) {
  const { profile, loading } = useProfile();
  const navigate = useNavigate();

  console.log(profile);

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

  return <Route {...routeProp}>{children}</Route>;
}

export default PrivateRoute;
