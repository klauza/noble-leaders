import  { useEffect } from 'react'
import { connect } from 'react-redux'; 
import { updateGameScore } from '../../actions/gameActions';
import { userUpdate } from '../../actions/loginActions';

const UpdateThisGame = ({ user, current, theAttempts, userUpdate, updateGameScore, setTheEntryScore, theEntryScore, theRoundScore }) => {

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
      
      updateGameScore({
        _id: current._id,
        attempts: theAttempts,
        date: new Date()
      })
    }

  // eslint-disable-next-line
  }, [theAttempts])
 

  return (
    null
  )
}


export default connect(null, { userUpdate, updateGameScore })(UpdateThisGame)
