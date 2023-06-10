import React, { useEffect } from "react";
import firebase from "firebase/app";
import {
  Alert,
  Button,
  Col,
  Container,
  Grid,
  Icon,
  Loader,
  Panel,
  Row,
} from "rsuite";
import { auth, database } from "../misc/firebase";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/profile.context";

function SignIn() {
  const { loading, profile } = useProfile();

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

    if (profile && !loading) {
      return navigate("/");
    }
  }, [loading, navigate, profile]);

  const signInWithProvider = async (provider) => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      Alert.success("Signed in", 400);
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
