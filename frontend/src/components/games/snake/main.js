// BASE
// const adjust    = n => f => xs => mapi(x => i => i === n ? f(x) : x)(xs)
// const dropFirst = xs => xs.slice(1)
const dropLast  = xs => xs.slice(0, xs.length - 1)
// const id        = x => x
// const k         = x => y => x
// const map       = f => xs => xs.map(f)
// const mapi      = f => xs => xs.map((x, i) => f(x)(i))
const merge     = o1 => o2 => Object.assign({}, o1, o2)
const mod       = x => y => ((y % x) + x) % x // http://bit.ly/2oF4mQ7
// const objOf     = k => v => ({ [k]: v })
// const pipe      = (...fns) => x => [...fns].reduce((acc, f) => f(acc), x)
// const range     = n => m => Array.apply(null, Array(m - n)).map((_, i) => n + i)
// const rep       = c => n => map(k(c))(range(0)(n))
const rnd       = min => max => Math.floor(Math.random() * max) + min
// const spec      = o => x => Object.keys(o)  // it takes keys out of object [x is avalue]
//   .map(k => objOf(k)(o[k](x)))  // maps over the keyes
//   .reduce((acc, o) => Object.assign(acc, o))

// Constants
const NORTH = { x: 0, y:-1 }
const SOUTH = { x: 0, y: 1 }
const EAST  = { x: 1, y: 0 }
const WEST  = { x:-1, y: 0 }

// Point operations
const pointEq = p1 => p2 => p1.x === p2.x && p1.y === p2.y


// Booleans
const willEat   = state => pointEq(nextHead(state))(state.apple)
const willSelfCrash = state => state.snake.find(pointEq(nextHead(state)))

const willObstacleCrash = state => state.obstacle.find(pointEq(nextHead(state))) // if head will be on obstacle position ==> dead

const validMove = move => state =>
  state.moves[0].x + move.x !== 0 || state.moves[0].y + move.y !== 0


// Next values based on state
const nextMoves = state => state.moves.length > 1 // if the moves list is greater than 0
  ? state.moves.slice(1) // return first = use first 
  : state.moves

const nextApple = state => willEat(state)   // if snake will eat the apple
 ? rndApplePos(state)    // we need to create the next one
 : state.apple      // if he won't eat, leave on current position

const nextHead  = state => state.snake.length === 0
  ? {x: 2, y: 2} // random position? -> rndPos(state)
  : {
    x: mod(state.cols)(state.snake[0].x + state.moves[0].x),
    y: mod(state.rows)(state.snake[0].y + state.moves[0].y)
  }
const nextSnake = state => willSelfCrash(state)
  ? [] 
  : (willObstacleCrash(state)) ? []
  : (willEat(state))
    ? [nextHead(state)].concat(state.snake)
    : [nextHead(state)].concat(dropLast(state.snake))

const nextScore = state => willEat(state) ? state.score = state.score + 1 : state.score


// Randomness and check if apple rendered on any obstacle
const rndApplePos = state => {
  let newApple
  function createApple(){
    newApple = ({
      x: rnd(0)(state.cols - 1),
      y: rnd(0)(state.rows - 1)
    })
  }
  createApple();
  // console.log(newApple);
  state.obstacle.forEach((obs) => {
    if(JSON.stringify(obs) === JSON.stringify(newApple)){
      createApple();
    } 
  })
  
  return newApple
}

// random
// const rndPos = table => ({
//   x: rnd(0)(table.cols - 1),
//   y: rnd(0)(table.rows - 1)
// })


// Initial state
const initialState = () => ({
  cols:  20,
  rows:  14,
  moves: [EAST],
  snake: [{x: 2, y: 2}],
  apple: { x: 7, y: 2 },
  score: 0,
  obstacle: [{x: 5, y: 8}, {x: 6, y: 8}, {x: 7, y: 8}, {x: 11, y: 11}, {x: 12, y: 11}, {x: 11, y: 12}, {x: 12, y: 12}, {x: 0, y: 7}, {x: 0, y: 8}, {x: 0, y: 9}, {x: 0, y: 10}]
})

// next is a function that takes a state and produces new object
const next = state => ({
  rows: state.rows,
  cols: state.cols,
  moves: nextMoves(state),
  snake: nextSnake(state),
  apple: nextApple(state),
  score: nextScore(state),
  obstacle: state.obstacle
})


const enqueue = (state, move) => validMove(move)(state)
  ? merge(state)({ moves: state.moves.concat([move]) })
  : state

module.exports = { EAST, NORTH, SOUTH, WEST, initialState, enqueue, next }
