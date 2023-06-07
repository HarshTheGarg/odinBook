import React from "react";
import PropTypes from "prop-types";

function ListUser({user}) {
  return <div>{user.username}</div>;
}

ListUser.propTypes = {
  user: PropTypes.object,
};

export default ListUser;
