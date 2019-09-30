import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/gameActions';
import { loadUser } from '../../actions/loginActions';
import { Link } from 'react-router-dom';
import history from '../../history';
import forumData from './ForumContentThreadData'; // data
import Statistics from './ForumSpecialArticles/Statistics';  // special forum thread
import Loader from '../layout/Loader';

const ForumThread = ({props, login: {user, isAuthenticated}, game: {users}, getAllUsers, loadUser}) => {
  const [article, setArticle] = useState(null);
  const articleName = props.match.params.thread;
 
  useEffect(()=>{ 
    if(localStorage.token){
      

      async function initThread(){
        setArticle( forumData.filter(article => article.link === articleName)[0] )   // fetch given article
        if(!user) await loadUser();
        if(!users) await getAllUsers();
      }
      
  
      initThread();
    }

  // eslint-disable-next-line
  }, [])
 


  if(isAuthenticated && article !== null && users !== null){
    return (
      <div className="forum-content-wrapper">

      <button className="general-back-button" onClick={()=>history.goBack()}>Back</button>

        <div className="forum-content-thread">

          <div className="content-article-main">{article.content}</div>

          {article.specialArticle ? (
            <Statistics users={users} />
          ) : (null)}

          <div className="content-article-author">Added by <Link to={`/user/${article.slugAuthor}`}>{article.author}</Link></div>
        </div>
        
        
        <div className="forum-content-comment">
        {user.name === "testacc" ? (<h3>As a test account, you cannot add any comments</h3>) : 
        ( <Fragment>
            <span>Add a comment</span>
            <textarea rows="5" placeholder="Write something...">  
            </textarea>
            <button className="comment-submit">Send</button>  
          </Fragment>
          )}
        </div>
      


        <div className="forum-content-comments">
          <h2>Comments</h2>
          {article.comments && article.comments.map((comm,id)=>{
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
             

                {comm.name === user.name ? (<button className="delete-button"><i className="fa fa-times"></i></button>) : (null)}
                {comm.name === user.name ? (<button className="edit-button"><i className="fa fa-pencil"></i></button>) : (null)}
              </div>
            ) 
            : (null)) )
          })}
        </div>

      </div>
    )

  } else {
    return(
      <Loader />
    )
  }

}
const mapStateToProps = (state, ownProps) => ({
props: ownProps,
game: state.game,
login: state.login
})
export default connect(mapStateToProps, { getAllUsers, loadUser })(ForumThread)
