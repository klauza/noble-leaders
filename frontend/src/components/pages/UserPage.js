import React, {useEffect, useState} from 'react';
import Loader from '../layout/Loader';
import axios from 'axios';
import UserLoaded from './UserLoaded';
import UserNotExists from './UserNotExists';


const UserPage = (props) => {

  const [isFetching, setIsFetching] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    axios.get(`/api/allusers/user/${props.match.params.username}`)
      .then(res => setUser(res.data))
      .then(()=> setIsFetching(false))

    // userGet(props.match.params.username);
    // setIsFetching(false);
    




  //eslint-disable-next-line
  }, [])

  
  if(!isFetching && (user && user.length !== 0)){ // not fetchin, user exists, and user is is not empty object
    return (
      <UserLoaded user={user[0]} />
    )
  } else if(!isFetching && user && user.length === 0){   // user fetched but is empty object
    return(
      <UserNotExists />
    )
  } else{
    return(
      <Loader /> // fetchin
    )
  }

}


export default UserPage
