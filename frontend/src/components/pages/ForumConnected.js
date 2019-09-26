import React, {Fragment, useState} from 'react';
import ForumTopic from './ForumTopic';

const ForumConnected = ({user}) => {

  const [forumTab, setForumTab] = useState(0);

  const buttons = [
    {
      name: "General",
      icon: "fa fa-bullhorn"
    },
    {
      name: "Games",
      icon: "fa fa-gamepad"
    },
    {
      name: "Other",
      icon: "fa fa-chain-broken"
    }
  ]

  const changeTopic = (i) => {
    if(forumTab !== i){ setForumTab(i); }
  }

  return (
    <div className="forum forum-container">
      <strong>Welcome to forum <i className="fa fa-comment"></i>, {user.name}</strong>

      <div className="forum__main">

        <div className="forum__main-topics">
          {buttons.map((btn, i) => {
            return <button key={i} onClick={()=>changeTopic(i)}>{btn.name} <i className={btn.icon}></i></button>
          })}
        </div>


        <ForumTopic forumTab={forumTab} />

        
      </div>
    </div>
  )
}

export default ForumConnected
