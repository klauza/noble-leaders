import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import forumData from './ForumContentThreadData';

const ForumTopic = ({topics, forumTab, buttons}) => {
  

  console.log(forumTab);

  
  if(topics && topics.length){
    
  return (
    <Fragment>
      
      {/* Loading normal articles from db*/}
      {topics.map((topic,id) =>{
        if(topic.genre === buttons[forumTab].name){
          return ( 
            <div key={id} className="forum__main-thread">

              <Link to={`/forum/${topic.link}`}>
                <div className="forum__main-thread--top">
                  <span className="subject"><i className={topic.icon}></i> {topic.subject}</span>
                  <span className="desc">{topic.description}</span>
                </div>
              </Link>

              <div className="forum__main-thread--added-by">
                <span>added by: <Link to={`/user/${topic.slugAddedBy}`}>{topic.addedBy}</Link></span>
                <span>Last modified: {topic.date.replace(/T.*/i,'')} </span>
              </div>

            </div>
          )
        }else{return null}
      })}

      {/* Loading special articles from frontend*/}
      {forumTab === 3 && (
        forumData.map((forumThread, id) => 
          forumThread.specialArticle === true && (
            <div key={id} className="forum__main-thread">

              <Link to={`/forum/special/${forumThread.link}`}>
                <div className="forum__main-thread--top">
                  <span className="subject"><i className={forumThread.icon}></i> {forumThread.subject}</span>
                  <span className="desc">{forumThread.description}</span>
                </div>
              </Link>

              <div className="forum__main-thread--added-by">
                <span>added by: <Link to={`/user/${forumThread.slugAuthor}`}>{forumThread.author}</Link></span>
                <span>Last modified: {forumThread.createdAt} </span>
              </div>

            </div>
          )
        )
      )}

      Number of public topics: {topics.length}
    </Fragment>
  )
} else{
  return(
    <div>There are no topics</div>
  )
}
}

export default ForumTopic
