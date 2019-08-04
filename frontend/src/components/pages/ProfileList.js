import React from 'react';

const ProfileList = ({ geme }) => {
  const {name, score } = geme; 

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {'name: '}{name} 
      </h3>

      <ul className="list">
      {'score: '}{score}
      </ul>

  
    </div>
  )
}

export default ProfileList
