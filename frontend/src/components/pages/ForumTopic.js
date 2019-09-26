import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const ForumTopic = ({forumTab}) => {

  const topics = [
    {
      id: 0,
      genre: "general",
      link: `/forum/about-website`,
      icon: "fa fa-linode",
      subject: "About website & cc",
      description: "Write few words about your expressions with this website",
      addedBy: "Admin",
      slugAddedBy: "admin"
    },
    {
      id: 0,
      genre: "general",
      link: `/forum/leaderboard-tournament`,
      icon: "fa fa-trophy",
      subject: "Leaderboard",
      description: "Read how leaderboard works",
      addedBy: "Mario Marian",
      slugAddedBy: "mario-marian"
    },
    {
      id: 1,
      genre: "games",
      link: `/forum/snake-discussion`,
      icon: "fa fa-gamepad",
      subject: "Snake discussion",
      addedBy: "Admin",
      slugAddedBy: "admin"
    },
    {
      id: 2,
      genre: "other",
      link: `/forum/about-me`,
      icon: "fa fa-smile-o",
      subject: "Few words about you",
      addedBy: "Admin",
      slugAddedBy: "admin"
    }
  ]

  const numberOfTopics = () => {
    let amount = 0;
    amount = topics.length;

    return amount
  }

  return (
    <Fragment>
      
      {topics.map((topic,id) =>{
        if(topic.id === forumTab){
          return ( 
            <div key={id} className="forum__main-thread">

              <Link to={topic.link}>
                <div className="forum__main-thread--top">
                  <span><i className={topic.icon}></i> {topic.subject}</span>
                </div>
              </Link>

              <div className="forum__main-thread--added-by">
                <span>added by: <Link to={`/user/${topic.slugAddedBy}`}>{topic.addedBy}</Link></span>
                <span>Last modified: [Date]</span>
              </div>

            </div>
          )
        }else{return null}
      })}

      Number of topics: {numberOfTopics()}
    </Fragment>
  )
}

export default ForumTopic
