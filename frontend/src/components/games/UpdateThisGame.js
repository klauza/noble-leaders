import  { useEffect } from 'react'
import { connect } from 'react-redux'; 
import { updateGameScore } from '../../actions/gameActions';
import { userUpdate } from '../../actions/loginActions';
import { setAlert } from '../../actions/alertActions';

const UpdateThisGame = ({ user, current, theAttempts, userUpdate, updateGameScore, setTheEntryScore, theEntryScore, theRoundScore, setAlert }) => {

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
      setAlert("You have beaten your score!", "positive");
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


export default connect(null, { userUpdate, updateGameScore, setAlert })(UpdateThisGame)
