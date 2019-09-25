import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {loadUser, userUpdate} from '../../actions/loginActions';
import { setAlert } from '../../actions/alertActions';
import {getAllUsers} from '../../actions/gameActions';
import { setLeaderboardPage, setBackPage } from '../../actions/miscActions';
import Loader from '../layout/Loader';
import UsersList from './UsersList';
import Pagination from './Pagination';

import laurelsImg from '../../media/laurels.png';

const Leaderboard = ({login: {user, isAuthenticated, loading}, getAllUsers, setAlert, loadUser, userUpdate, game: {users, gLoading}, setLeaderboardPage, setBackPage, misc: {currPage, isBackPageSet}}) => {
  
  const [img, setImg] = useState(true);
  const [currentPage, setCurrentPage] = useState(currPage);
  const [postsPerPage] = useState(22);
  const [blockade, setBlockade] = useState(false);


  useEffect(() => {

    async function initLeaderBoard(){
      if(localStorage.token){
        await loadUser();
        await getAllUsers();

       

      } else {
        getAllUsers();
      }
      
      
    }

    initLeaderBoard();

    //eslint-disable-next-line
  }, []);

  // returns the position (rank) of logged in user; fires once after all user got loaded
  function targetUserPage(){
    if(blockade === false){
      ( users &&
        users.forEach((item, index) => {
        if(item.name === user.name){
          setBlockade(true);
          goUserPage(index);  // passing position
        }
      })
      )
    }
  }
  if(isAuthenticated && !isBackPageSet){
    targetUserPage();
  }

  function goUserPage(i){
    // i = user's rank
    i++;  // because users count starts from 0

    setCurrentPage( Math.ceil(i / postsPerPage ) );
    setLeaderboardPage( Math.ceil(i / postsPerPage ) );
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = (users && users.slice(indexOfFirstPost, indexOfLastPost));

  function loadImageAsync(image){
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', event => resolve(img));
      img.addEventListener('erorr', reason => reject(new Error('error')));
      img.src = image
    })
  }
  loadImageAsync(laurelsImg)
    .then(() => setImg(false))
    .catch(reason => console.log(reason));


 

  if(isAuthenticated){
    if(loading || gLoading || img){ return <Loader />} 
  } else {
    if(gLoading || img){ return <Loader />} 
  }
  
  const active = (num) => {
    Array.from(document.querySelector('.pagination').children).forEach(page => page.classList.remove('active'));
    const selectedP = document.querySelector(`.page-item:nth-child(${num})`);
    selectedP.classList.add('active');
    
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setLeaderboardPage(pageNumber);
  }


  return (
    <div className="leaderboard test-animation">
      <h1 className="leaderboard__title">LEADERBOARD</h1>
      <div className="leaderboard__img"><img src={laurelsImg} alt=""/></div>

      <ul className="leaderboard-ul">
      <Pagination active={active} paginate={paginate} postsPerPage={postsPerPage} totalPosts={users && users.length} currentPage={currentPage}/>
        <li className="sticky-li leaderboard-ul__li">
          <span><strong>Highscore</strong></span>
          <span><strong>Name</strong></span> 
          <span><strong>Quote</strong></span>
        </li>

        {users !== null ? 
          (
            <UsersList setBackPage={setBackPage} getAllUsers={getAllUsers} userUpdate={userUpdate} setAlert={setAlert} user={user} isAuthenticated={isAuthenticated} users={currentPosts} />
          ) 
          : 
          (
            <p>no user in database</p>
          )
        }
        
      </ul>

    </div>
      
  )
}

const mapStateToProps = state => ({
  login: state.login,   // state.login -> reducer
  game: state.game,
  misc: state.misc
})
export default connect(mapStateToProps, {getAllUsers, loadUser, userUpdate, setAlert, setLeaderboardPage, setBackPage})(Leaderboard)
