import React from 'react'
import PropTypes from 'prop-types'

function ListUser({user}) {

  const acceptRequest = () => {
    console.log("Accept");
  };

  const rejectRequest = () => {
    console.log("Reject");
  }

  return (
    <>
      {user.username}
      <button onClick={acceptRequest}>Accept</button>
      <button onClick={rejectRequest}>Reject</button>
    </>
  )
}

ListUser.propTypes = {
  user: PropTypes.object
}

export default ListUser
