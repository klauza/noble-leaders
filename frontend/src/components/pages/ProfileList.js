import React from 'react';

const ProfileList = ({ game }) => {
  const {name, score } = game; 

  return (
    <div className="profile__bottom--item">

      <div className="item-img"><img alt=""/></div>

      <div className="item-name">
        <span>{name}</span>
      </div>

      <ul className="item-score">
        <span>Highscore: <strong>{score}</strong></span>
      </ul>

    </div>
  )
}

export default ProfileList
