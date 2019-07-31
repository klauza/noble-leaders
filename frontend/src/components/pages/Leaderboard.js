import React from 'react'

const Leaderboard = () => {
  return (
    <div className="leaderboard container mt-5">
      <h2 className="leaderboard__title">LEADERBOARD</h2>
      <input className="leaderboard__search" type="text" placeholder="search user" />

      <ul className="leaderboard-ul">
        <li className="leaderboard-ul__li">Bob</li>
        <li className="leaderboard-ul__li">Xaviery</li>
        <li className="leaderboard-ul__li">Sarah</li>
        <li className="leaderboard-ul__li">Elizabeth</li>
        <li className="leaderboard-ul__li">Michael</li>
      </ul>
    </div>
  )
}

export default Leaderboard;
