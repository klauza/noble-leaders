import React from 'react';

const ProfileGameList = ({ game, image }) => {
  const {name, score, attempts } = game; 



  return (
    <div className="profile__bottom--item">

      <div className="item-img"><img src={image} alt=""/></div>
      
      <div className="item-name">
        <span>{name}</span>
      </div>

      <div className="item-score">
        <div className="item-score__highscore">
          <span>{score}</span>
        </div>
        <div className="item-score__attempts">
          <span>{attempts}</span>
        </div>
      </div>

    </div>
  )
}

export default ProfileGameList
