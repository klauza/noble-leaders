import React from 'react'

const UserLoaded = ({user}) => {
  console.log(user);
  return (
    <div className="userPage-container">
      <h2>{user.name}'s profile</h2>
    </div>
  )
}

export default UserLoaded
