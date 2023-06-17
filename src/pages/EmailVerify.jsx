import React, { useEffect } from "react";
import { useProfile } from "../context/profile.context";
import { useNavigate } from "react-router-dom";

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
      <h1>Please verify your email!!</h1>
    </div>
  );
}

export default EmailVerify;
