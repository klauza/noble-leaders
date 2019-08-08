import React, {Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alertActions';
import { loadUser, userUpdate } from '../../../actions/loginActions';
import { getUserGames, updateGameScore } from '../../../actions/gameActions';
import { EAST, NORTH, SOUTH, WEST, initialState, enqueue, next} from './main.js';



const Snake = ({login: {isAuthenticated, user}, game: { current, games }, setAlert, userUpdate, getUserGames, updateGameScore, loadUser}) => {
  const [canvas, setCanvas] = useState(null);
  const [apples, setApples] = useState(0);
  const [block, setBlock] = useState(false);


  useEffect(() => {
  
    if(localStorage.token) {
      async function snakeInit(){
        await loadUser();
        await getUserGames("snake");
        document.querySelector('.snake-the-game-container').focus();
      }
      snakeInit();
      setCanvas(document.getElementById('canvas'));
    } else {
      setCanvas(document.getElementById('canvas'));
    }
    //eslint-disable-next-line
  }, []);

  let ctx = null;
  

  
  
  function startTheSnake() {

  if(canvas){
    ctx = canvas.getContext('2d');
  
    // Mutable state
    let state = initialState()

    // Position helpers
    const x = column => Math.round(column * canvas.width / state.cols)
    const y = row => Math.round(row * canvas.height / state.rows)


    // Game loop draw
  
    const draw = () => {

      
      // console.log(state.obstacle);
      
      // clear
      ctx.fillStyle = '#232323'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // draw snake
      ctx.fillStyle = 'rgb(0,200,50)'
      state.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)))

      // draw apples
      ctx.fillStyle = 'rgb(255,50,0)'
      ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1))

      // draw obstacles
      ctx.fillStyle = '#fff';
      state.obstacle.map( p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)))

      
      setApples(state.score);
      
      // add crash
      if (state.snake.length === 0) {
        console.log('crash');
        console.log(state.score);
        if(isAuthenticated && state.score > 0){
          console.log(state.score);
          
          let roundScore = parseInt(state.score, 10); 
          

          async function updateActorGameScore(){
            // await getUserGames("snake");
            let entryScore = await document.querySelector('.highSc').textContent;
            entryScore = parseInt(entryScore, 10);
            console.log('entry: ',entryScore, 'thisRound: ',roundScore);
            
            if(roundScore > entryScore){
              if(entryScore === 0){
                // setAlert("Congratulations! Now see your score in your Profile!", 'danger');
                async function sumScore(){
                  let userTotalScore = await user.highscore;
                  console.log('totalscore: ',userTotalScore);
                  console.log('roundscore: ',roundScore);

                  userTotalScore = await userTotalScore + roundScore;   // just increment total entryScore

                  // update user's highscore
                  const updUserHighscore = await {
                    _id: user._id,
                    highscore: userTotalScore,
                    date: new Date()
                  }
                  await userUpdate(updUserHighscore);

                }
                sumScore();

                async function sumGameScore(){
                  // update current game
                  const updScore = await {
                    _id: current._id,
                    score: roundScore,
                    date: new Date()
                  }
                  await updateGameScore(updScore);
                  
                }
                await sumGameScore();
                await loadUser();
                await getUserGames("snake");

              } else {
                // update score if higher than previous
                // setAlert("You have beaten your score, nice job!", 'danger');
                async function sumScore(){
                  console.log('entryscore in highscore: ', entryScore);
                  console.log('roundscore in highscore: ', roundScore);
                  let userTotalScore = await user.highscore;
                  userTotalScore = await userTotalScore - entryScore;
                  userTotalScore = await userTotalScore + roundScore;   // just increment total entryScore
                  console.log('totalscore: ', userTotalScore);
              
                  // update user's highscore
                  const updUserHighscore = await {
                    _id: user._id,
                    highscore: userTotalScore,
                    date: new Date()
                  }
                  await loadUser();
                  await userUpdate(updUserHighscore);

                
                }
                sumScore();


                async function sumGameScore(){
                  // update current game
                  const updScore = await {
                    _id: current._id,
                    score: roundScore,
                    date: new Date()
                  }
                  await updateGameScore(updScore);
                  
                }
                await sumGameScore();
                await loadUser();
                await getUserGames("snake");
              }

            } else {
              //console.log('nothing to update, your score was lower');
              // setAlert("Unfortunately you didn't beat your score", 'danger');
            }
          }
          updateActorGameScore().then(() => {
            
            window.location.reload(true);
          });
        


       }else {
        // If not logged in
        //console.log('please log in to update the score');
        // setAlert('please log in to update the score', 'danger');
      }
  

       
      

        
        

        ctx.fillStyle = 'rgb(255,0,0)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        state.score = 0;  // reset score, save score
    }
      
      
  
    }

    // Game loop update
    const step = t1 => t2 => {
      if (t2 - t1 > 100) {
        state = next(state)
        draw()
        window.requestAnimationFrame(step(t2))
      } else {
        window.requestAnimationFrame(step(t1))
      }
    }

    // Key events
    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'w': case 'h': case 'ArrowUp':    state = enqueue(state, NORTH); break
        case 'a': case 'j': case 'ArrowLeft':  state = enqueue(state, WEST);  break
        case 's': case 'k': case 'ArrowDown':  state = enqueue(state, SOUTH); break
        case 'd': case 'l': case 'ArrowRight': state = enqueue(state, EAST);  break
        default: return
      }
    })

    // Main

   
    draw();
    window.requestAnimationFrame(step(0))
 
  }
}


const startTheSnakeNow = (e) => {
    console.log(e);
    if(e.keyCode === 13){
      if(block !== true){
        document.querySelector('.snake-the-game-container').removeEventListener('onKeyDown', startTheSnakeNow, {passive: false} );
        console.log(document.querySelector('.snake-the-game-container'));
        startTheSnake();
      }
      document.querySelector('.snake-title').style.display = "none";
      // remove event listener
      setBlock(true);
    }
}




  return (
    <Fragment>
      <div className="snake-the-game-container" tabIndex="0" onKeyDown={startTheSnakeNow}>
      <div className="snake-current-score">{apples > 0 ? <span>{apples}</span> : <span></span>}</div>
        <span className="snake-title">Press ENTER to start</span>
        <canvas id="canvas" width="700" height="500" ></canvas>
      </div>
      
      <div className="outputScore"><span>Your highscore: <span className="highSc">{current && current.score}</span></span></div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  login: state.login,
  game: state.game
})
export default connect(mapStateToProps, {getUserGames, loadUser, updateGameScore, setAlert, userUpdate})(Snake);
