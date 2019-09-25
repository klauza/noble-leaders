import React from 'react';

const ForumConnected = ({user}) => {
  return (
    <div className="forum-container">
      <strong>Welcome to forum, {user.name}</strong>
    </div>
  )
}

export default ForumConnected
