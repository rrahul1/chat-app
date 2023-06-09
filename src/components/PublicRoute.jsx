import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { Container, Loader } from "rsuite";
import { useProfile } from "../context/profile.context";

function PublicRoute({ children, ...routeProp }) {
  const { profile, loading } = useProfile();
  console.log(profile.name);
  const navigate = useNavigate();

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

  if (profile && !loading) {
    return navigate("/");
  }

  return <Route {...routeProp}>{children}</Route>;
}

export default PublicRoute;
