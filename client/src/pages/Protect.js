import React, { useEffect } from "react";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

function Protect() {

  const state = useSelector(state => state);

  if (state.isLoggedIn) {
    return <div>Protect</div>;
  } else {
    const navigate = useNavigate();
    useEffect(() => {
      navigate("/signIn");
    }, []);
  }
}

export default React.memo(Protect);
