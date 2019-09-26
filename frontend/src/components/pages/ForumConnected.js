import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setForumPage } from '../../actions/miscActions';
import ForumTopic from './ForumTopic';

const ForumConnected = ({user, setForumPage, misc: {forumPage}}) => {

  const [forumTab, setForumTab] = useState(forumPage);

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
    if(forumTab !== i){ setForumTab(i); setForumPage(i); }
  }

  return (
    <div className="forum forum-container">
      <strong>Welcome to forum <i className="fa fa-comment"></i>, {user.name}</strong>

      <div className="forum__main">

        <div className="forum__main-topics">
          {buttons.map((btn, i) => {
            return <button className={`${i === forumTab && 'active'}`} key={i} onClick={()=>changeTopic(i)}>{btn.name} <i className={btn.icon}></i></button>
          })}
        </div>


        <ForumTopic forumTab={forumTab} />

        
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  misc: state.misc
})
export default connect(mapStateToProps, {setForumPage})(ForumConnected)
