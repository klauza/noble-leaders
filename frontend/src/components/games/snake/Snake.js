import React, {Fragment, useState, useEffect} from 'react';
// import Loader from '../../layout/Loader';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alertActions';
import { loadUser, userUpdate } from '../../../actions/loginActions';
import { getUserGames, updateGameScore } from '../../../actions/gameActions';
import { EAST, NORTH, SOUTH, WEST, snakeState, enqueue, next} from './main.js';
import UpdateThisGame  from '../UpdateThisGame';



const Snake = ({login: {isAuthenticated, user}, game: { current, games }, setAlert, userUpdate, getUserGames, updateGameScore, loadUser}) => {
  const [canvas, setCanvas] = useState(null);
  const [apples, setApples] = useState(0);
  const [block, setBlock] = useState(false);
  
  const [entryAttempts, setEntryAttempts] = useState(null);
  const [theEntryScore, setTheEntryScore] = useState(null);
  const [theRoundScore, setTheRoundScore] = useState(null);


  useEffect(() => {
  
    if(localStorage.token) {
      async function snakeInit(){
        await loadUser();
        if(entryAttempts === null) await getUserGames("snake");
        if(current && current.name === "snake") await setEntryAttempts(current.attempts);
        if(current && current.name === "snake") await setTheEntryScore(current.score);
      
      
      }
      snakeInit();
   
    } else {
      // not logged in
    }

    try{
      setCanvas(document.getElementById('canvas'));
      document.querySelector('.snake-the-game-container').focus();
      document.querySelectorAll('.snake-hint').forEach(a => a.style.opacity = "1");
    }catch(err){
      console.log('avoided crash');
      return
    }


    //eslint-disable-next-line
  }, [block, current]);

  


  let ctx = null;
  

  
function startTheSnake() {

  if(canvas){
    ctx = canvas.getContext('2d');
  
    // Mutable state
    let state = snakeState()
    
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
        setTheRoundScore(state.score);
        setEntryAttempts(prevState => prevState+1);

        if(theRoundScore > theEntryScore){
          setTheEntryScore(state.score);
        }
        
        // console.log('crash, scored ',state.score);
        
        if(isAuthenticated && state.score > 0){
          // if score higher than previous tell user that he beated the score
     

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

const displayBtnsOnBigScreen = () => {
  document.querySelector('.mobile-arrows-container').style.display ="grid";
  document.querySelector('.snake-hint-button').style.display ="none";
}
  
  return (
    <Fragment>
      <div className="snake-the-game-container" tabIndex="0" onKeyDown={startTheSnakeNow}>

        {/* LOADING SCREEN */}
        <div className="update-score-load-screen"></div>

        <div className="snake-current-score">{apples > 0 ? <span>{apples}</span> : <span>0</span>}</div>
        <span className="snake-title">Press ENTER to start</span>

        
        {/* mobile only */}
        <div className="mobile-start" onClick={startMobile}>Tap to Start</div>
        
        {/* canvas */}
        <canvas id="canvas" width="700" height="500" ></canvas>
      </div>

      {/* mobile only */}
      
      <div className="mobile-arrows-container">
        <button className="mobile-arrow mobile-arrows-up">U</button>
        <button className="mobile-arrow mobile-arrows-down">D</button>
        <button className="mobile-arrow mobile-arrows-left">L</button>
        <button className="mobile-arrow mobile-arrows-right">R</button>
      </div>

      {current && entryAttempts !== null && theEntryScore !== null && theRoundScore !== null ? <UpdateThisGame user={user} current={current} theAttempts={entryAttempts} theGame={"snake"} setTheEntryScore={setTheEntryScore} setEntryAttempts={setEntryAttempts} theEntryScore={theEntryScore} theRoundScore={theRoundScore} /> : null }

      {theEntryScore && <div className="outputScore">{ isAuthenticated ? <span>Your highscore: <span className="highSc">{theEntryScore}</span></span> : <span>Log in to see your score</span>}</div> }
      
      <div className="about-game">
        <h1 className="snake-hint about-game-title">About</h1>
        <ul>
          <li className="snake-hint">Each <span style={{"color": "red"}}>red block</span> will give you 1 point</li>
          <li className="snake-hint">Avoid <span style={{textShadow: "#000 0px 0px 10px", color: "white"}}>white blocks</span></li>
          <li className="snake-hint">Use <span style={{textDecoration:"underline"}}>up, down, left, right</span> arrows to move the snake</li>
          <li className="snake-hint mobile-hide-hint">need extra help with steering?<button className="snake-hint snake-hint-button" onClick={displayBtnsOnBigScreen}>Click to show buttons</button></li>
        </ul>
        
      </div>

    </Fragment>
  )
}

const mapStateToProps = state => ({
  login: state.login,
  game: state.game
})
export default connect(mapStateToProps, {getUserGames, loadUser, updateGameScore, setAlert, userUpdate})(Snake);
