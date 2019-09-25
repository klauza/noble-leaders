import React from 'react';
import history from '../../history';

const UserNotExists = () => {
  const goBackOne = () => {
    history.goBack();
  }
  return (
    <div className="userPageNotExist-container">
      <button onClick={()=>{goBackOne()}}>Back</button>
      <h2>Sorry, this user somehow doesn't appear to have a profile</h2>
    </div>
  )
}

export default UserNotExists
