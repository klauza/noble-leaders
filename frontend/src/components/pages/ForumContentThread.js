import React, {Fragment, useEffect, useState, useRef} from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/gameActions';
import { userLogin, loadUser } from '../../actions/loginActions';
import { setAlert } from '../../actions/alertActions';
import { getATopic, getTopicComments, updateTopic, createTopicComment, updateComment, deleteComment, clearTopicError } from '../../actions/forumActions';
import { Link } from 'react-router-dom';
import history from '../../history';
// import forumData from './ForumContentThreadData'; // data
import Statistics from './ForumSpecialArticles/Statistics';  // special forum thread
import Loader from '../layout/Loader';

const ForumThread = ({props, login: {user, isAuthenticated}, game: {users}, getAllUsers, userLogin, loadUser, setAlert, getATopic, updateTopic, clearTopicError, createTopicComment, getTopicComments, updateComment, deleteComment, forum: {error, current, loading, comments}}) => {

  const articleName = props.match.params.thread;
  const [comm, setComm] = useState('');
  const topicDiv = useRef();
  const topicEditbtns = useRef();
  const commentDiv = useRef();

  useEffect(()=>{ 
    if(localStorage.token){

      if(error !== null){
        setAlert(error[0].msg, "danger");
        clearTopicError();
      }

      async function initThread(){
        await loadUser();
        await getAllUsers();
        if(!current) await getATopic(articleName);
        // setArticle( forumData.filter(article => article.link === articleName)[0] )   // fetch given article
        // setArticle( current );   // fetch given article
      
        if(current) await getTopicComments(current._id);
     
      }
      
  
      initThread();
    }

  // eslint-disable-next-line
  }, [ current, error ])
  // console.log(current._id);
  const logInOnTestacc = async () => {
    await userLogin({
      email: "testacc@test.acc",
      password: "testacc"
    })
    await window.location.reload(true);
  }

  // THREAD EDITING
  const runEditTopic = () => {
    topicDiv.current.contentEditable="true";
    topicDiv.current.style.border="1px solid black";
    topicEditbtns.current.style.display="block";
    topicDiv.current.focus();
  }
  const editTopicCancel = () => {
    topicEditbtns.current.style.display="none"; 
    topicDiv.current.style.border="0";
    topicDiv.current.contentEditable="false";
    topicDiv.current.textContent = current.content;
  }
  const editTopicConfirm = () => {
    topicEditbtns.current.style.display="none"; 
    topicDiv.current.style.border="0";
    topicDiv.current.contentEditable="false";
    let newContent = topicDiv.current.textContent;
    updateTopic({
      _id: current._id,
      content: newContent
    });
  }

  // COMMENT EDITING
  const runCommentDelete = (comm) => {
    deleteComment(comm);
    setAlert("Comment has been deleted", "danger");
  }
  const runCommentEdit = (id) => {
    let commDiv = document.querySelector(`.edit-${id}`); // select comment content
    commDiv.contentEditable="true";
    commDiv.focus();
    commDiv.parentElement.parentElement.querySelectorAll('.edit-button, .delete-button').forEach(b=> b.style.display="none"); // hide 'edit' btn of this comment
    commDiv.parentElement.parentElement.querySelectorAll('.confirm-comment-changes, .decline-comment-changes').forEach(b => b.style.display="block"); 
  }
  const declineCommChanges = (id, commContent) =>{
    let commDiv = document.querySelector(`.edit-${id}`);
    commDiv.contentEditable="false";
    commDiv.innerHTML=commContent;
    commDiv.parentElement.parentElement.querySelectorAll('.confirm-comment-changes, .decline-comment-changes').forEach(b => b.style.display="none");
    commDiv.parentElement.parentElement.querySelectorAll('.edit-button, .delete-button').forEach(b=> b.style.display="block"); 
  }
  const confirmCommChanges = (id) =>{
    let commDiv = document.querySelector(`.edit-${id}`);

    updateComment({
      _id: id,
      content: commDiv.textContent
    });
    commDiv.contentEditable="false";
    commDiv.parentElement.parentElement.querySelectorAll('.confirm-comment-changes, .decline-comment-changes').forEach(b => b.style.display="none");
    commDiv.parentElement.parentElement.querySelectorAll('.edit-button, .delete-button').forEach(b=> b.style.display="block"); 

    setAlert("Comment edited", "positive");
  }


  // VARIOUS
  const setCommText = (e) => {
    setComm(e.target.value);
  }
  const createComment = () => {
    let submitComment = {
      content: comm,
      author: user.name,
      slugAuthor: user.nameSlug
    }
    createTopicComment(current._id, submitComment);
    setComm("");
    commentDiv.current.value = "";
  }

  

  if(isAuthenticated && current !== null && users !== null && !loading){
    return (
      <div className="forum-content-wrapper">

      <button className="general-back-button" onClick={()=>history.goBack()}>Back</button>

        <div className="forum-content-thread">

          <h2 className="content-article-subject">{current.subject}</h2>

          <div className="content-article-main" ref={topicDiv}>{current.content}</div>
          {current.slugAddedBy === user.nameSlug ? (
          <Fragment>
            <button className="content-article-edit" onClick={runEditTopic}><i className="fa fa-pencil"></i></button>
            <div className="btns-edit" ref={topicEditbtns}>
              <button className="btn-edit-confirm" onClick={editTopicConfirm}>Confirm <i className="fa fa-check"></i></button>
              <button className="btn-edit-cancel" onClick={editTopicCancel}>Cancel <i className="fa fa-times"></i></button>
            </div>
          </Fragment>
          ) : (null)}


          {current.specialArticle ? (
            <Statistics users={users} />
          ) : (null)}

          <div className="content-article-author">Added by <Link to={`/user/${current.slugAddedBy}`}>{current.addedBy}</Link></div>
        </div>
        
        
        <div className="forum-content-comment">
        {user.name === "testacc" ? (<h3>As a test account, you cannot add any comments</h3>) : 
        ( <Fragment>
            <span>Add a comment</span>
            <textarea ref={commentDiv} onChange={(e)=>setCommText(e)} rows="5" placeholder="Write a comment...">  
            </textarea>
            <button onClick={createComment} className="comment-submit">Send</button>  
          </Fragment>
          )}
        </div>
      


        <div className="forum-content-comments">
          <h2>Comments</h2>
          {comments && comments.map((comm,id)=>{
            return ( users.map((someone, i) => someone.nameSlug === comm.slugAuthor ? 
            (
              <div style={{animationDelay: `${id*250}ms`}} className="comment comment-animation" key={i}>
                <Link to={`/user/${comm.slugAuthor}`}>
                  <div>
                    <div className="comment-image"><img src={someone.avatar} alt=""/></div>
                    <div className="comment-author">{comm.author} 
                      {comm.author === user.name ? (<span className="comment-author-span"> (you)</span>):(null)}
                    </div>
                  </div>
                </Link>

                <div className="comment-container">
                  <div className={`comment-container__content edit-${comm._id}`}>{comm.content}</div>
                  {comm.edited === true ? (
                    <div className="comment-container__date-posted">edited: {comm.date.replace(/T.*/i,'')}</div>
                  ) : (
                    <div className="comment-container__date-posted">posted: {comm.date.replace(/T.*/i,'')}</div>
                  )}
                </div>
             

                {comm.author === user.name ? (
                  <Fragment>
                    <button className="delete-button" onClick={()=>runCommentDelete(comm)}><i className="fa fa-times"></i></button>
                    <button className="edit-button" onClick={()=>runCommentEdit(comm._id)}><i className="fa fa-pencil"></i></button>
                    <button className="confirm-comment-changes" onClick={()=>confirmCommChanges(comm._id)}><i className="fa fa-check"></i></button>
                    <button className="decline-comment-changes" onClick={()=>declineCommChanges(comm._id, comm.content)}><i className="fa fa-times"></i></button>
                  </Fragment>
                  ): (null)}

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
export default connect(mapStateToProps, { getAllUsers, userLogin, loadUser, setAlert, getATopic, updateTopic, getTopicComments, createTopicComment, updateComment, deleteComment, clearTopicError })(ForumThread)
