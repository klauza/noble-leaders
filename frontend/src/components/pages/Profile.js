import React, {useEffect, Fragment} from 'react';
import ProfileList from './ProfileList';
// import {useState} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';
import { getUserGames, createTheGame } from '../../actions/gameActions';
import history from '../../history';

const Profile = ({login: {isAuthenticated, user, loading}, loadUser, createTheGame, getUserGames, game: { games, gLoading }}) => {
  // const [block, blockSet] = useState(false)
  // const [gry, grySet] = useState([])
  
 

  useEffect(() => {
    if(localStorage.token){

      async function profileInit(){
        if(localStorage.token){
          await loadUser();
          await getUserGames(null);
        } 
      };

      profileInit();
    }else {
      history.push('/');
    }
  
    //eslint-disable-next-line
  }, []);


  // console.log(gLoading);
      if(gLoading === false){
        if(games && games.length === 0){
          createTheGame({
            name: 'actor-game',
            score: 0
          });
          createTheGame({
            name: 'snake',
            score: 0
          });
          createTheGame({
            name: 'tomb-raider',
            score: 0
          });
         
         
        } else {
          
        }
      } 


 if(loading || gLoading){ return <p>loading....</p>} 

  return (
    <Fragment>
      {games && !loading && !gLoading && games.length === 3 && 
        <div className="container profile">
          <h2 className="mt-5">you are logged in as {user && user.name}</h2>
          <p>your total score: {user && user.highscore}</p>
          {games !== null && !gLoading ? games.map((geme) => <ProfileList key={geme._id} geme={geme} />) : null }
        </div>
      }
    </Fragment>
 
    
  )
}

const mapStateToProps = state => ({
  login: state.login,
  game: state.game
})
export default connect(mapStateToProps, {loadUser, createTheGame, getUserGames})(Profile)
