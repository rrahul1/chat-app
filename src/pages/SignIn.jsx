import React, { useEffect } from "react";
import firebase from "firebase/app";
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from "rsuite";
import { auth, database } from "../misc/firebase";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/profile.context";
import LoginForm from "../components/LoginForm";

function SignIn() {
  const { profile } = useProfile();

  const navigate = useNavigate();

  useEffect(() => {
    if (!profile && !profile?.isEmailVerified) {
      return navigate("/signin");
    }

    if (profile && profile?.isEmailVerified === false) {
      console.log(profile, "kflkdsjfk");
      return navigate("/verify");
    }

    if (profile && profile?.isEmailVerified) {
      return navigate("/");
    }
  }, [navigate, profile]);

  const signInWithProvider = async (provider) => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          email: user.email,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      Alert.success("Signed in", 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const handleFacebookSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const handleGoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome To Chat</h2>
                <p>Progressive chat platform for neophytes</p>
              </div>
              <div>
                <LoginForm />
              </div>

              <h2 style={{ textAlign: "center" }}>OR</h2>
              <div className="mt-3">
                <Button block color="blue" onClick={handleFacebookSignIn}>
                  <Icon icon="facebook" /> Continue with Facebook
                </Button>

                <Button block color="red" onClick={handleGoogleSignIn}>
                  <Icon icon="google" /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
}

export default SignIn;
