import React, { useEffect } from "react";
import { useProfile } from "../context/profile.context";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "rsuite";

function EmailVerify() {
  const { profile } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile && profile?.isEmailVerified) {
      navigate("/");
    }
  }, [profile, navigate]);

  return (
    <div className="mt-page">
      {profile && profile?.isEmailVerified ? (
        <Button appearance="link" componentClass={Link} to="/">
          Click to continue
        </Button>
      ) : (
        <h1>Please verify your email to continue</h1>
      )}
    </div>
  );
}

export default EmailVerify;
