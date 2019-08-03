import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../../actions/loginActions';
import { getUserGames } from '../../../actions/gameActions';


const Snake = ({getUserGames, loadUser}) => {

  useEffect(() => {
    loadUser();
    getUserGames("snake");
    //eslint-disable-next-line
  }, [])

  return (
    <div>
      Welcome to snake game
    </div>
  )
}

export default connect(null, {getUserGames, loadUser})(Snake);
