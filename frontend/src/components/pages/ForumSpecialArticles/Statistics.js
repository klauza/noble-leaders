import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getGamesData} from '../../../actions/gameActions';

const Statistics = ({users, getGamesData, game: {gamesData} }) => {

  // const [data, setData] = useState(null);

  useEffect(()=>{
    async function stats(){
      await getGamesData();
    }
    stats();

  }, [])
  
  



  // calculate average and sum of attempts
  const calculateSnakeStatistics = (type, givenGame) => {
    let gamesQty = 0;
    let sumAttempts = 0;
    let participated = 0;
    gamesData.map((game) => {
      if(game.name === givenGame){
        if(game.attempts === 0) {
          return 
        } else{
          participated = participated + 1;
          gamesQty = gamesQty + 1;
          sumAttempts = sumAttempts + game.attempts;
        }
      }
    })
      let average = sumAttempts/gamesQty;
      if(type === "sum") return Math.round(sumAttempts*100)/100
      if(type === "avg") return Math.round(average*100)/100
      if(type === "participated") return participated
  }

  if(gamesData){
    return (
      <div className="forum-statistics">

        <table>
          <tr>
            <th>Game</th>
            <th>Total attempts</th>
            <th>Avg per player</th>
            <th>Players participated</th>
          </tr>
          <tr>
            <td>Actor-quiz</td>
            <td>{calculateSnakeStatistics("sum", "actor-quiz")}</td>
            <td>{calculateSnakeStatistics("avg", "actor-quiz")}</td>
            <td>{calculateSnakeStatistics("participated", "actor-quiz")}</td>
          </tr>
          <tr>
            <td>Snake</td>
            <td>{calculateSnakeStatistics("sum", "snake")}</td>
            <td>{calculateSnakeStatistics("avg", "snake")}</td>
            <td>{calculateSnakeStatistics("participated", "snake")}</td>
          </tr>
          <tr>
            <td>Reveal Cards</td>
            <td>{calculateSnakeStatistics("sum", "reveal-cards")}</td>
            <td>{calculateSnakeStatistics("avg", "reveal-cards")}</td>
            <td>{calculateSnakeStatistics("participated", "reveal-cards")}</td>
          </tr>
        </table>

        <table>

        </table>
      </div>
    )
  } else{ return null}

}
const mapStateToProps = (state, ownProps) => ({
  props: ownProps,
  game: state.game
})
export default connect(mapStateToProps, {getGamesData})(Statistics)
