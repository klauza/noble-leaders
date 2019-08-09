import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {loadUser, userUpdate} from '../../actions/loginActions';
import { setAlert } from '../../actions/alertActions';
import {getAllUsers} from '../../actions/gameActions';
import Loader from '../layout/Loader';
import Users from './Users';
import Pagination from './Pagination';

import laurelsImg from '../../media/laurels.png';

const Leaderboard = ({login: {user, isAuthenticated, loading}, getAllUsers, setAlert, loadUser, userUpdate, game: {users, gLoading}}) => {
  
  const [img, setImg] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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

    initLeaderBoard()

    //eslint-disable-next-line
  }, [isAuthenticated]);

  function targetUserPage(){
    if(blockade === false){
      ( users &&
        users.forEach((item, index) => {
          console.log(item, ' - ',index)
        if(item.name === user.name){
          setBlockade(true);
          goUserPage(index);
        }
      })
      )
    }
  }
  if(isAuthenticated){
    targetUserPage();
  }
  function goUserPage(i){
    // console.log(i);
    
    if(i+1 <= 22){
      setCurrentPage(1);
    } else 
    if(i+1 > 22 && i+1 <= 44){
      setCurrentPage(2);
    } else
    if(i+1 > 44){
      setCurrentPage(3);
    }
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
  }


  return (
    <div className="leaderboard test-animation">
      <h2 className="leaderboard__title">LEADERBOARD</h2>
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
            <Users getAllUsers={getAllUsers} userUpdate={userUpdate} setAlert={setAlert} user={user} isAuthenticated={isAuthenticated} users={currentPosts} />
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
  game: state.game
})
export default connect(mapStateToProps, {getAllUsers, loadUser, userUpdate, setAlert})(Leaderboard)
