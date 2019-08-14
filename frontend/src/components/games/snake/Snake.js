import React, {Fragment, useState, useEffect} from 'react';
// import Loader from '../../layout/Loader';
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
        try{
          await document.querySelector('.snake-the-game-container').focus();
          
        }catch(err){
          console.log('avoided crash');
          return
        }
      
      }
      snakeInit();
   
       
  
      setCanvas(document.getElementById('canvas'));
    } else {
      try{
        document.querySelector('.snake-the-game-container').focus();
      }catch(err){
        console.log('avoided crash');
        return
      }
      setCanvas(document.getElementById('canvas'));
    }
    document.querySelector('.outputScore').style.opacity = "1";
    document.querySelectorAll('.snake-hint').forEach(a => a.style.opacity = "1");
    //eslint-disable-next-line
  }, [block]);

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
  
    const draw = (check) => {
      
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
        
        console.log('crash, scored ',state.score);
        if(isAuthenticated && state.score > 0){

          let roundScore = parseInt(state.score, 10); 
          
          async function updateActorGameScore(){
            // await getUserGames("snake");
            let entryScore = await document.querySelector('.highSc').textContent;
            entryScore = parseInt(entryScore, 10);
            // console.log('entry: ',entryScore, 'thisRound: ',roundScore);
            
            if(roundScore > entryScore){
              document.querySelector('.update-score-load-screen').classList.add('cover');
      
              if(entryScore === 0){
                // setAlert("Congratulations! Now see your score in your Profile!", 'danger');
                async function sumScore(){
                  let userTotalScore = await user.highscore;

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
                  let userTotalScore = await user.highscore;
                  userTotalScore = await userTotalScore - entryScore;
                  userTotalScore = await userTotalScore + roundScore;   // just increment total entryScore
              
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
             
              
              await window.location.reload(true);
            
            } 
          }
          updateActorGameScore();
        

        }else {
        // If not logged in
       
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
    
    // key events mobile
    var allKeys = document.querySelectorAll('.mobile-arrow');
    allKeys.forEach((key) => {
      key.addEventListener('click', ()=>{
        switch(key.textContent){
          case "U": state = enqueue(state, NORTH); break
          case "D": state = enqueue(state, SOUTH); break
          case "L": state = enqueue(state, WEST);  break
          case "R": state = enqueue(state, EAST);  break
          default: return
        }
      })
    })

    // Main
    draw();
    window.requestAnimationFrame(step(0))
    
  }
}


const startTheSnakeNow = (e) => {
  if(block !== true){
    if(e.keyCode === 13){
        setBlock(true);
        startTheSnake();
        document.querySelector('.snake-title').style.display = "none";
    }
  }
  // remove event listener
  document.querySelector('.snake-the-game-container').removeEventListener('onKeyDown', startTheSnakeNow, false );
}

const startMobile = (e) =>{
  document.querySelector('.mobile-start').style.display ="none";
  startTheSnake();
}


  return (
    <Fragment>
      <div className="snake-the-game-container" tabIndex="0" onKeyDown={startTheSnakeNow}>

        {/* LOADING SCREEN */}
        <div className="update-score-load-screen"></div>

        <div className="snake-current-score">{apples > 0 ? <span>{apples}</span> : <span>0</span>}</div>
        <span className="snake-title">Press ENTER to start</span>

        
        {/* mobile only */}
        <div className="mobile-start" onClick={startMobile}>Tap to Start<br/>side screen view recommended</div>
        
        {/* canvas */}
        <canvas id="canvas" width="700" height="500" ></canvas>
      </div>

      {/* mobile only */}
      <div className="mobile-arrows-container">
        <div className="mobile-arrow mobile-arrows-up">U</div>
        <div className="mobile-arrow mobile-arrows-down">D</div>
        <div className="mobile-arrow mobile-arrows-left">L</div>
        <div className="mobile-arrow mobile-arrows-right">R</div>
      </div>

      <div className="outputScore">{ isAuthenticated ? <span>Your highscore: <span className="highSc">{current && current.score}</span></span> : <span>Log in to see your score</span>}</div>
     
      <div className="snake-hint">Each <span style={{"color": "red"}}>red block</span> will give you 1 point</div>
      <div className="snake-hint">Avoid white blocks</div>
      
    </Fragment>
  )
}

const mapStateToProps = state => ({
  login: state.login,
  game: state.game
})
export default connect(mapStateToProps, {getUserGames, loadUser, updateGameScore, setAlert, userUpdate})(Snake);
