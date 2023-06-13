import React from 'react';
import PropTypes from 'prop-types';

function ListUser({user, setFriendsList}) {
  return (
    <>
      {user.username}
    </>
  );
}

ListUser.propTypes = {
  user: PropTypes.object,
  setFriendsList: PropTypes.func
};

export default ListUser;
