import React from 'react';
import {Link} from 'react-router-dom';

const UsersList = ({users, isAuthenticated, user, setAlert, userUpdate, getAllUsers}) => {


  const deleteQuote = () => {
    let q = "smthing";
    const updateUserQuote = {
      _id: user._id,
      quote: q.replace("smthing","-"),
      date: new Date()
    }

    async function updateThenLoadUsers(){
      await userUpdate(updateUserQuote);
      await setAlert("Quote deleted", "danger");
      await getAllUsers();
    }
    updateThenLoadUsers();
  }

  return (
    <div>
    {users.map(iUser => 
      <li className={`leaderboard-ul__li ${isAuthenticated && iUser.name === user.name && "selected"}`} key={iUser._id} >
        <span>{iUser.highscore}</span>
        <span><Link to={`/user/${iUser.nameSlug}`}>{iUser.name}</Link></span> 
        <span>{isAuthenticated && iUser.quote === "-" && user._id === iUser._id ? <span className="no-quote"><Link to="/profile">Click to set your quote</Link></span> : iUser.quote}</span>
        {isAuthenticated && user._id === iUser._id && iUser.quote !== "-" && <span className="delete-quote" onClick={deleteQuote}><i className="fa fa-times"></i></span> }
      </li>
      )}
    </div>
  )
}

export default UsersList
