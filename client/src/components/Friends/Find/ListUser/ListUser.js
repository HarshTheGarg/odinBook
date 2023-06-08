import React, { useState } from "react";
import PropTypes from "prop-types";

function ListUser({ type, user }) {
  const [ requested, setRequested ] = useState(type == "requested" ? true : false);

  const request = () => {
    
    if(requested) {
      // Un-request
      console.log("Un-Request");
    } else {
      // Request
      console.log("Request");
    }

    setRequested(!requested);

  };

  return (
    <>
      {user.username}
      <button onClick={request} className={requested ? "requested" : null}>
        {requested ? "Requested" : "Request"}
      </button>
    </>
  );
}

ListUser.propTypes = {
  type: PropTypes.string,
  user: PropTypes.object,
};

export default ListUser;
