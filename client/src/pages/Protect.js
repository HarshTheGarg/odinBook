import React, { useEffect } from "react";
import { isLoggedIn } from "../lib/authUtils";
import { useNavigate } from "react-router-dom";

function Protect() {
  if (isLoggedIn()) {
    return <div>Protect</div>;
  } else {
    const navigate = useNavigate();
    useEffect(() => {
      navigate("/signIn");
    }, []);
  }
}

export default React.memo(Protect);
