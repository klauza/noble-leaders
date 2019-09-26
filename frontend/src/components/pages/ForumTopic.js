import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const ForumTopic = ({forumTab}) => {

  const topics = [
    {
      id: 0,
      genre: "general",
      link: `/forum/about-website`,
      icon: "fa fa-linode",
      subject: "About website",
      addedBy: "Admin"
    },
    {
      id: 0,
      genre: "general",
      link: `/forum/leaderboard-tournament`,
      icon: "fa fa-trophy",
      subject: "Leaderboard",
      addedBy: "Admin"
    },
    {
      id: 1,
      genre: "games",
      link: `/forum/snake-general`,
      icon: "fa fa-linode",
      subject: "About snake",
      addedBy: "Admin"
    },
    {
      id: 2,
      genre: "other",
      link: `/forum/about-me`,
      icon: "fa fa-linode",
      subject: "Few words about me",
      addedBy: "Admin"
    }
  ]


  return (
    <Fragment>
      Topic: {forumTab}
      {topics.map((topic,id) =>{
        if(topic.id === forumTab){
          return ( 
            <Link key={id} to={topic.link}>
              <div className="forum__main-thread">
                <span><i className={topic.icon}></i>Subject: {topic.subject}</span>
                <span>added by: {topic.addedBy}</span>
              </div>
            </Link>
          )
        }
      })}
    </Fragment>
  )
}

export default ForumTopic
