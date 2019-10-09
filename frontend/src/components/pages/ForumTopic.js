import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

const ForumTopic = ({topics, forumTab, buttons}) => {
  // console.log(topics);



  
  if(topics && topics.length){
    
  return (
    <Fragment>
      
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

      Number of topics: {topics.length}
    </Fragment>
  )
} else{
  return(
    <div>There are no topics</div>
  )
}
}

export default ForumTopic
