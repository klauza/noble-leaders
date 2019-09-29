import React, {Fragment, useEffect} from 'react'
import { connect } from 'react-redux'; 
import { updateGameScore } from '../../actions/gameActions';
import { userUpdate } from '../../actions/loginActions';

const UpdateThisGame = ({ user, current, theAttempts, userUpdate, updateGameScore, setTheEntryScore, setEntryAttempts, theEntryScore, setTheRoundScore, theRoundScore }) => {

  useEffect(()=>{

    if(theEntryScore < theRoundScore){
      setTheEntryScore(theRoundScore);

      updateGameScore({
        _id: current._id,
        score: theRoundScore,
        attempts: theAttempts,
        date: new Date()
      })
      userUpdate({
          _id: user._id,
          highscore: user.highscore+(theRoundScore-theEntryScore),
          date: new Date()
      })

    } else{
      console.log('RUN UPDATE')
      updateGameScore({
        _id: current._id,
        attempts: theAttempts,
        date: new Date()
      })
    }

  }, [theAttempts])
 

  return (
    null
  )
}


export default connect(null, { userUpdate, updateGameScore })(UpdateThisGame)
