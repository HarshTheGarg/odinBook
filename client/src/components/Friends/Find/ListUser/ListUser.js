import React from "react";
import PropTypes from "prop-types";

function ListUser({ type, user }) {
  return (
    <>
      {user.username}
      {type=="requested" ? "requested" : "Add"}
    </>
  );
}

ListUser.propTypes = {
  type: PropTypes.string,
  user: PropTypes.object
};

export default ListUser;
