import React, {useEffect, useState} from 'react';
import history from '../../history';
import axios from 'axios';
import { actor, snake, cards } from '../../media/images';

const UserLoaded = ({user}) => {

  const [games, setGames] = useState(null);
  const gameImg = [actor, snake, cards];

  useEffect(()=>{
    axios.get(`/api/games/${user._id}`)
      .then(res => setGames(res.data))
      // .then(()=> setIsFetching(false))

  //eslint-disable-next-line
  }, [])

  console.log(user);
  console.log(games);

  const goBackOne = () => {
    history.goBack();
  }


  return (
    <div className="userPage userPage-container">
      <button onClick={()=>{goBackOne()}}>Back</button>
      <h2>{user.name}'s profile</h2>
      <div className="userPage_image-container">
        <img src={user.avatar} alt=""/>
      </div>
      <div className="userPage_games-container">
        {games && games.map((game, i) =>
          (
          <div className="game" key={i}>
            <img src={gameImg[i]}/>
            <span>{game.name}</span>
            <span>{game.score}</span>
          </div>
          )
        )}
      </div>
      <h3>Total score of {user.name}: {user.highscore}</h3>
    </div>
  )
}


export default UserLoaded
