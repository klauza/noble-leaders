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
    {users.map(item => 
            <li className={`leaderboard-ul__li ${isAuthenticated && item.name === user.name && "selected"}`} key={item._id} >
              <span>{item.highscore}</span>
              <span>{item.name}</span> 
              <span>{isAuthenticated && item.quote === "-" && user._id === item._id ? <span className="no-quote"><Link to="/profile">Click to set your quote</Link></span> : item.quote}</span>
              {isAuthenticated && user._id === item._id && item.quote !== "-" && <span className="delete-quote" onClick={deleteQuote}><i className="fa fa-times"></i></span> }
            </li>
            )}
    </div>
  )
}

export default UsersList
