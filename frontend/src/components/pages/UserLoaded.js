import React from 'react';
import history from '../../history';

const UserLoaded = ({user}) => {
  // console.log(user);

  const goBackOne = () => {
    history.goBack();
  }

  return (
    <div className="userPage-container">
      <button onClick={()=>{goBackOne()}}>Back</button>
      <h2>{user.name}'s profile</h2>
    </div>
  )
}


export default UserLoaded
