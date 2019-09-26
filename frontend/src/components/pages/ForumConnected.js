import React from 'react';
import {Link} from 'react-router-dom';

const ForumConnected = ({user}) => {
  return (
    <div className="forum forum-container">
      <strong>Welcome to forum <i className="fa fa-comment"></i>, {user.name}</strong>

      <div className="forum__main">

        <div className="forum__main-topics">
          <div>All <i className="fa fa-bullhorn"></i></div>
          <div>Games <i className="fa fa-gamepad"></i></div>
          <div>Anything <i className="fa fa-chain-broken"></i></div>
        </div>

        <Link to="/forum/about-website">
          <div className="forum__main-thread">
            <span><i className="fa fa-linode"></i>subject: About website</span>
            <span>added by: Admin</span>
          </div>
        </Link>

        <div className="forum__main-thread">
        <i className="fa fa-trophy"></i> About Leaderboard
        </div>

        <div className="forum__main-thread">
          Something
        </div>
        
      </div>
    </div>
  )
}

export default ForumConnected
