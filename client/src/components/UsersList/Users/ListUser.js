import React from "react";
import PropTypes from "prop-types";

function ListUser({user}) {
  const addFriend = () => {
    console.log(user._id, user.username);
  }
  return <>
    <div>{user.username} ({user.email})</div>
    <button onClick={addFriend}>Add Friend</button>
  </>;
}

ListUser.propTypes = {
  user: PropTypes.object,
};

export default ListUser;
