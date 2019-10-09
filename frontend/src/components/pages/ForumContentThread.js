import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/gameActions';
import { userLogin, loadUser } from '../../actions/loginActions';
import { setAlert } from '../../actions/alertActions';
import { getATopic } from '../../actions/forumActions';
import { Link } from 'react-router-dom';
import history from '../../history';
import forumData from './ForumContentThreadData'; // data
import Statistics from './ForumSpecialArticles/Statistics';  // special forum thread
import Loader from '../layout/Loader';

const ForumThread = ({props, login: {user, isAuthenticated}, game: {users}, getAllUsers, userLogin, loadUser, setAlert, getATopic, forum: {current, loading}}) => {

  const articleName = props.match.params.thread;
 
  useEffect(()=>{ 
    if(localStorage.token){
      

      async function initThread(){
        getATopic(articleName);
        // setArticle( forumData.filter(article => article.link === articleName)[0] )   // fetch given article
        // setArticle( current );   // fetch given article
        await loadUser();
        await getAllUsers();
      }
      
  
      initThread();
    }

  // eslint-disable-next-line
  }, [])

 
  const logInOnTestacc = async () => {
    await userLogin({
      email: "testacc@test.acc",
      password: "testacc"
    })
    await window.location.reload(true);
  }

  const runDelete = () => {
    setAlert("This feature doesn't work yet", "danger");
  }
  const runEdit = () => {
    setAlert("This feature doesn't work yet", "danger");
  }


  if(isAuthenticated && current !== null && users !== null && !loading){
    return (
      <div className="forum-content-wrapper">

      <button className="general-back-button" onClick={()=>history.goBack()}>Back</button>

        <div className="forum-content-thread">

          <h2 className="content-article-subject">{current.subject}</h2>

          <div className="content-article-main">{current.content}</div>

          {current.specialArticle ? (
            <Statistics users={users} />
          ) : (null)}

          <div className="content-article-author">Added by <Link to={`/user/${current.slugAuthor}`}>{current.author}</Link></div>
        </div>
        
        
        <div className="forum-content-comment">
        {user.name === "testacc" ? (<h3>As a test account, you cannot add any comments</h3>) : 
        ( <Fragment>
            <span>Add a comment</span>
            <textarea rows="5" placeholder="It's going to work soon...">  
            </textarea>
            <button className="comment-submit">Send</button>  
          </Fragment>
          )}
        </div>
      


        <div className="forum-content-comments">
          <h2>Comments</h2>
          {current.comments && current.comments.map((comm,id)=>{
            return ( users.map((someone, i) => someone.nameSlug === comm.slugName ? 
            (
              <div className="comment" key={i}>
                <Link to={`/user/${comm.slugName}`}>
                  <div>
                    <div className="comment-image"><img src={someone.avatar} alt=""/></div>
                    <div className="comment-author">{comm.name}</div>
                  </div>
                </Link>

                <div className="comment-container">
                  <div className="comment-container__content"><p>{comm.content}</p></div>
                  <div className="comment-container__date-posted">posted: {comm.date}</div>
                </div>
             

                {comm.name === user.name ? (<button className="delete-button" onClick={runDelete}><i className="fa fa-times"></i></button>) : (null)}
                {comm.name === user.name ? (<button className="edit-button" onClick={runEdit}><i className="fa fa-pencil"></i></button>) : (null)}
              </div>
            ) 
            : (null)) )
          })}
        </div>

      </div>
    )

  } else if(localStorage.token){
    return(
      <Loader />
    )
  } else {
    return(
      <div className="not-logged-div">
        <h3>Please log in to access a forum</h3>
        <button onClick={()=>logInOnTestacc()}><span>Log in as </span><span>Test Account</span></button>
      </div>
    
   
    )
  }

}
const mapStateToProps = (state, ownProps) => ({
props: ownProps,
game: state.game,
login: state.login,
forum: state.forum
})
export default connect(mapStateToProps, { getAllUsers, userLogin, loadUser, setAlert, getATopic })(ForumThread)
