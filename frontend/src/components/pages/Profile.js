import React, {Fragment, useEffect} from 'react';
import ProfileList from './ProfileList';
// import {useState} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';
import { getUserGames, createTheGame } from '../../actions/gameActions';
import history from '../../history';
import profile from '../../media/profile.jpg'
import cup from '../../media/puchar.png'

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
            name: 'tomb-raider',
            score: 0
          });
          createTheGame({
            name: 'snake',
            score: 0
          });
          createTheGame({
            name: 'actor-game',
            score: 0
          });
         
         
        } else {
          
        }
      } 


 if(loading || gLoading){ return <p>loading....</p>} 

  return (
    <Fragment>
    {games && !loading && !gLoading && games.length === 3 &&
      <div className="profile">

        <div className="profile__top">
          <div className="profile__top--score">
            <div className="score-title">Your total score</div>
            <div className="score-points">
              <div className="cup"><img src={cup} alt=""/></div>
              <div className="points">{user.highscore}</div>
            </div>
          </div>
          <div className="profile__top--image">
            <div className="user-name"><span>{user.name}</span></div>
            <div className="img-holder"><img src={profile} alt=""/></div>
          </div>
        </div>

        
        
          <div className="profile__bottom">
            {games !== null && !gLoading ? games.map((game) => <ProfileList key={game._id} game={game} />) : null }
          </div>
        
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
