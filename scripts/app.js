
function init(){




  // Start-view section

  setTimeout(addLetter, 500)
  // message to add
  const inputMessage = "Star-date: 2159. Location: very far. Rank: Ensign. Shirt: Red"
  let currentMessage = ''
  const currentDiv = document.querySelector('.hero')
  let firstCall = true

  // function to type message
  function addLetter(letterIndexToAdd = 0){
    if (currentMessage.length === inputMessage.length) {
      currentDiv.removeChild(currentDiv.lastChild)
      return
    }
    currentMessage = currentMessage + `${inputMessage[letterIndexToAdd]}`

    const newLetter = document.createElement('span')
    newLetter.innerHTML = `${inputMessage[letterIndexToAdd]}`
    newLetter.classList.add('cursor')
    const newCursor = document.createElement('span')


    if (firstCall === true) {
      currentDiv.removeChild(document.querySelector('.cursor'))
    } else {
      currentDiv.removeChild(currentDiv.lastChild)
    }
    currentDiv.appendChild(newLetter)
    currentDiv.appendChild(newCursor)

    firstCall = false

    setTimeout(function (){
      addLetter(letterIndexToAdd + 1)
    }, 150)

  }












  const startContainer = document.querySelector('.start-container')
  const gameSurround = document.querySelector('.outer-container')
  const gridWrapper = document.querySelector('.grid-wrapper')
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('.start')
  const lives = document.querySelector('.lives')
  const slideInMission = document.querySelector('.slide-in')
  const gameOver = document.querySelector('.game-over')
  const restartBtn = document.querySelector('.restart-btn')
  const scoreDisplay = document.querySelector('.score')
  const smallDotSound = document.querySelector('#smalldot-sound')
  const pillPickUpSound = document.querySelector('#pill-sound')
  const gameOverSound = document.querySelector('#gameover-sound')
  const collisionSound = document.querySelector('#collision-sound')
  const finalScore = document.querySelector('.final-score')
  const winScore = 3333360
    
  startButton.addEventListener('click', playGame)
  startButton.addEventListener('click', displayGameSurround)
  gridWrapper.style.display = 'none'
  
  let currentBoard = null
  let newBoard = null
  let cells = []
  let dotCount = 0

  

  function displayGameSurround(){
    gameSurround.classList.add('display')
  }






  const boardOne =
[
  ['XXXXXXXXXXXXXXXXXXX'],
  ['XooooooooXooooooooX'],
  ['XoXXoXXXoXoXXXoXXoX'],
  ['XoooooooooooooooooX'],
  ['XoXXoXoXXXXXoXoXXoX'],
  ['XooooXoooXoooXooooX'],
  ['XXXXoXXXoXoXXXoXXXX'],
  ['XXXXoXoooooooXoXXXX'],
  ['XXXXoXoXXoXXoXoXXXX'],
  ['oooooooXoooXooooooo'],
  ['XXXXoXoXoooXoXoXXXX'],
  ['XXXXoXoXXoXXoXoXXXX'],
  ['XXXXoXoooooooXoXXXX'],
  ['XXXXoXoXXXXXoXoXXXX'],
  ['XooooooooXooooooooX'],
  ['XoXXoXXXoXoXXXoXXoX'],
  ['XooXoooooooooooXooX'],
  ['XXoXoXoXXXXXoXoXoXX'],
  ['XooooXoooXoooXooooX'],
  ['XoXXXXXXoXoXXXXXXoX'],
  ['XoooooooooooooooooX'],
  ['XXXXXXXXXXXXXXXXXXX']
]

  const boardTwo = [...boardOne].reverse()
  

  //   const boardTwo =
  // [
  //   ['XXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
  //   ['XooooooooooooXXooooooooooooX'],
  //   ['XoXXXXoXXXXXoXXoXXXXXoXXXXoX'],
  //   ['XoXXXXoXXXXXoXXoXXXXXoXXXXoX'],
  //   ['XoXXXXoXXXXXoXXoXXXXXoXXXXoX'],
  //   ['XooooooooooooooooooooooooooX'],
  //   ['XoXXXXoXXoXXXXXXXXoXXoXXXXoX'],
  //   ['XoXXXXoXXoXXXXXXXXoXXoXXXXoX'],
  //   ['XooooooXXooooXXooooXXooooooX'],
  //   ['XXXXXXoXXXXXoXXoXXXXXoXXXXXX'],
  //   ['XXXXXXoXXXXXoXXoXXXXXoXXXXXX'],
  //   ['XXXXXXoXXooooooooooXXoXXXXXX'],
  //   ['XXXXXXoXXoXXXooXXXoXXoXXXXXX'],
  //   ['XXXXXXoXXoXooooooXoXXoXXXXXX'],
  //   ['ooooooooooXooooooXoooooooooo'],
  //   ['XXXXXXoXXoXooooooXoXXoXXXXXX'],
  //   ['XXXXXXoXXoXXXXXXXXoXXoXXXXXX'],
  //   ['XXXXXXoXXooooooooooXXoXXXXXX'],
  //   ['XXXXXXoXXoXXXXXXXXoXXoXXXXXX'],
  //   ['XXXXXXoXXoXXXXXXXXoXXoXXXXXX'],
  //   ['XooooooooooooXXooooooooooooX'],
  //   ['XoXXXXoXXXXXoXXoXXXXXoXXXXoX'],
  //   ['XoXXXXoXXXXXoXXoXXXXXoXXXXoX'],
  //   ['XoooXXooooooooooooooooXXoooX'],
  //   ['XXXoXXoXXoXXXXXXXXoXXoXXoXXX'],
  //   ['XXXoXXoXXoXXXXXXXXoXXoXXoXXX'],
  //   ['XooooooXXooooXXooooXXooooooX'],
  //   ['XoXXXXXXXXXXoXXoXXXXXXXXXXoX'],
  //   ['XoXXXXXXXXXXoXXoXXXXXXXXXXoX'],
  //   ['XooooooooooooooooooooooooooX'],
  //   ['XXXXXXXXXXXXXXXXXXXXXXXXXXXX']
  // ]


  //map the input array to a new array with each letter of inputArr as an individual array element
  function generateBoard(inputBoard, newBoard){
    const splitInputArr = inputBoard.map(subArr => subArr.join('').split('')) 
    for (let y = 0; y < splitInputArr.length; y++){
      const cellsSubArray = []
      for (let x = 0; x < splitInputArr[1].length; x++){
        const cell = document.createElement('div')
        cell.setAttribute('data-appearance',`${splitInputArr[y][x]}`)
        cell.style.height = `${100 / splitInputArr.length}%`
        cell.style.width = `${100 / splitInputArr[0].length}%`
        //Allows for passageway styling
        if (cell.dataset.appearance === 'o'){
          if (inputBoard === boardOne){
            cell.classList.add('passageway-light')
          } else if (inputBoard === boardTwo) {
            cell.classList.add('passageway-dark')
          }
        } else {
          if (inputBoard === boardOne){
            cell.classList.add('wall-light')
          } else if (inputBoard === boardTwo) {
            cell.classList.add('wall-dark')
          }
        }
        grid.appendChild(cell)
        cellsSubArray.push(cell)
      }
      cells.push(cellsSubArray)
    }
    addDots(inputBoard, newBoard)
  }
  
  
  //generateBoard(boardTwo.reverse())


  function addDots(inputBoard, newBoard){

    for (let y = 0; y < cells.length; y++){
      for (let x = 0; x < cells[1].length; x++){
        //To allow styling and behavior of all passageways
        if (cells[y][x].dataset.appearance === 'o'){
          //To include dots, big dots, pills and service passages
          if ((y === 1 && x === 1) ||
          (y === 1 && x === cells[0].length - 2) || 
          (y === cells.length - 2 && x === 1) ||
          (y === cells.length - 2 && x === cells[0].length - 2)){
            if (newBoard){
            // eslint-disable-next-line quotes
              cells[y][x].innerHTML = "<span class='pill-dot'></span>"
            } 
          } else if (x === 0 || x === cells[0].length - 1) {
            // eslint-disable-next-line quotes
            cells[y][x].innerHTML = "<span class='service-tunnel'></span>"
          } else {
            if (inputBoard === boardOne){
              // eslint-disable-next-line quotes
              cells[y][x].innerHTML = `<span class='dot' style="background-color: hsl(${x * y}, 90%, 50%)"></span>`
              dotCount++
            }
            if (inputBoard === boardTwo){
            // eslint-disable-next-line quotes
              cells[y][x].innerHTML = "<span class='emergency-dot'></span>"
              dotCount++
            }
          }
        }
      }
    }
  }


  // Declare timers
 
  let captainTimer
  let engineerTimer
  let weaponsTimer
  let navigationTimer
  let captainTimerFlee
  let engineerTimerFlee
  let weaponsTimerFlee
  let navigationTimerFlee
  let enemyOneTimerId
  let enemyTwoTimerId
  let enemyThreeTimerId
  let enemyFourTimerId
  let collisionIdOne
  let collisionIdTwo
  let collisionIdThree
  let collisionIdFour

  const chaseDirectionTimers = new Set()
  const fleeDirectionTimers = new Set()
  const collisionIdArr = []
  const modeChangeIdArr = []


  let numsOfBoards = 0

  function playGame(reset = false){
    
    // console.log(cells.length, 'in board:', numsOfBoards)
    for (let i = 1; i < 9999; i++){
      window.clearInterval(i)
    }

    if (reset === true){
      for (let i = 1; i < 9999; i++){
        window.clearInterval(i)
      }
      displayGameSurround()
      playerOne.score = 0
      scoreDisplay.textContent = playerOne.score
      playerOne.addLife()
      playerOne.addLife()
      playerOne.addLife()
      cells = []
      grid.textContent = ''
      currentBoard = null
      reset = false
    }

    startContainer.classList.add('hide')
    gridWrapper.style.display = 'flex'
    newBoard = true
    gameOver.classList.remove('display')

    if (currentBoard !== boardOne){
      currentBoard = boardOne
      playerOne.yPos = 3
      playerOne.xPos = 9
      enemyOne.yPos = 9
      enemyOne.xPos = 8
      enemyTwo.yPos = 9
      enemyTwo.xPos = 10
      enemyThree.yPos = 10
      enemyThree.xPos = 8
      enemyFour.yPos = 10
      enemyFour.xPos = 10
      // console.log('generating board one')
      generateBoard(boardOne, newBoard)
    } else {
      currentBoard = boardTwo
      playerOne.yPos = 18
      playerOne.xPos = 9
      enemyOne.yPos = 11
      enemyOne.xPos = 9
      enemyTwo.yPos = 12
      enemyTwo.xPos = 9
      enemyThree.yPos = 11
      enemyThree.xPos = 10
      enemyFour.yPos = 12
      enemyFour.xPos = 10
      // console.log('generating board two')
      generateBoard(boardTwo, newBoard)
    }

    document.addEventListener('keyup', handleKey)
    
    playerOne.appear()
    enemyOne.appear()
    enemyTwo.appear()
    enemyThree.appear()
    enemyFour.appear()

    playerOne.putDotInMouth()
    enemyOne.putDotInMouth()
    enemyTwo.putDotInMouth()
    enemyThree.putDotInMouth()
    enemyFour.putDotInMouth()

    runGameChase(enemyOne)
    runGameChase(enemyTwo)
    runGameChase(enemyThree)
    runGameChase(enemyFour)

    // enemyOneTimerId = detectModeChange(enemyOne)
    // enemyTwoTimerId = detectModeChange(enemyTwo)
    // enemyThreeTimerId = detectModeChange(enemyThree)
    // enemyFourTimerId = detectModeChange(enemyFour)
    // modeChangeIdArr.push(enemyOneTimerId, enemyTwoTimerId, enemyThreeTimerId, enemyFourTimerId)

    collisionIdOne = detectCollision(enemyOne)
    collisionIdTwo = detectCollision(enemyTwo)
    collisionIdThree = detectCollision(enemyThree)
    collisionIdFour = detectCollision(enemyFour)
    collisionIdArr.push(collisionIdOne, collisionIdTwo, collisionIdThree, collisionIdFour)

    numsOfBoards++
    // console.log('timers for mode change:', modeChangeIdArr)
    // console.log('timers for collision detection:', collisionIdArr)
    // console.log(`playing with board: ${numsOfBoards}`)
  }



  // define a class of Player, which will be instantiated as playerOne
  // Player will be parent class of Enemy class
  class Player {
    constructor(yPos, xPos, name, score = 0){
      this.xPos = xPos
      this.yPos = yPos
      this.name = name
      this.score = score
      this.lives = 3
      this._mode = null
      this.dotInMouth = false
    }
    appear(){
      cells[this.yPos][this.xPos].classList.add(`${this.name}`)
      if (this.mode === 'flee'){
        cells[this.yPos][this.xPos].classList.add('fleeing')
      } 
    }
    disappear(yPos, xPos){
      cells[yPos][xPos].classList.remove(`${this.name}`)
      cells[yPos][xPos].classList.remove('fleeing')
    }
    moveRight(isEnemy = false){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      if (cells[this.yPos][this.xPos + 1].children.length !== 0) {
        
        if (cells[this.yPos][this.xPos + 1].children[0].classList.contains('service-tunnel')){
          this.xPos = 0
        } else {
          this.xPos = this.xPos + 1
        }
      } else {
        this.xPos = this.xPos + 1
      }
      this.mover(this, 'right', tempXPosition, tempYPosition, isEnemy)
      this.checkEatDot(isEnemy)
    }
    moveLeft(isEnemy = false){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      if (cells[this.yPos][this.xPos - 1].children.length !== 0) {
        if (cells[this.yPos][this.xPos - 1].children[0].classList.contains('service-tunnel')){
          this.xPos = cells[0].length - 1
        } else {
          this.xPos = this.xPos - 1
        }
      } else {
        this.xPos = this.xPos - 1
      }
      this.mover(this, 'left', tempXPosition, tempYPosition, isEnemy)
      this.checkEatDot(isEnemy)
    }
    moveUp(isEnemy = false){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      this.yPos = this.yPos - 1
      this.mover(this, 'up', tempXPosition, tempYPosition, isEnemy)
      this.checkEatDot(isEnemy)
    }
    moveDown(isEnemy = false){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      this.yPos = this.yPos + 1
      this.mover(this, 'down', tempXPosition, tempYPosition, isEnemy)
      this.checkEatDot(isEnemy)
    }
    loseLife(){
      this.lives--
      lives.removeChild(lives.firstElementChild)
    }
    addLife(){
      this.lives++
      const lifeIcon = document.createElement('div')
      lifeIcon.classList.add('life')
      lives.appendChild(lifeIcon)
    }
    //A method to check whether the cell that the player inhabits contains either a dot or a big-dot class
    // if dot or big-dot classes are present, score is increased accordingly
    checkEatDot(isEnemy){
      if ((isEnemy === false && cells[this.yPos][this.xPos].children[0].classList.contains('dot')) ||
      (isEnemy === false && cells[this.yPos][this.xPos].children[0].classList.contains('emergency-dot'))){
        cells[this.yPos][this.xPos].children[0].classList.remove('dot')
        cells[this.yPos][this.xPos].children[0].classList.remove('emergency-dot')
        this.score += 10
        scoreDisplay.textContent = playerOne.score
        smallDotSound.currentTime = 0
        smallDotSound.play()        
        dotCount--
        if (dotCount === 0){
          addDots(currentBoard, false)
        }
      } else if ((isEnemy === false && cells[this.yPos][this.xPos].children[0].classList.contains('big-dot')) ||
      (isEnemy === false && cells[this.yPos][this.xPos].children[0].classList.contains('pill-dot'))){
        cells[this.yPos][this.xPos].children[0].classList.remove('big-dot')
        cells[this.yPos][this.xPos].children[0].classList.remove('pill-dot')
        this.score += 50
        scoreDisplay.textContent = playerOne.score
        pillPickUpSound.play()
        bigDotTriggerFlee()
      } 

      if (isEnemy === false && this.score >= winScore){
        endGame(this)
      }
    }

    putDotInMouth(){
      if (cells[this.yPos][this.xPos].children[0].classList.contains('dot') 
        || cells[this.yPos][this.xPos].children[0].classList.contains('emergency-dot')){
        cells[this.yPos][this.xPos].children[0].classList.remove('dot')
        cells[this.yPos][this.xPos].children[0].classList.remove('emergency-dot')
        this.dotInMouth = true
      } 
    }

    spitOutDot(tempYPosition, tempXPosition){
      if (this.dotInMouth === true){
        if (currentBoard === boardOne){
          cells[tempYPosition][tempXPosition].children[0].classList.add('dot')
        } else if (currentBoard === boardTwo){
          cells[tempYPosition][tempXPosition].children[0].classList.add('emergency-dot')
        }
        this.dotInMouth = false
      } else {
        return
      }
    }



    //helper function responsible for moving (disappearing and appearing) all characters
    // Includes some logic for collision handling, under conditions of chase vs flee for enemies  
    mover(character, direction, tempXPosition, tempYPosition, isEnemy){
      if (cells[character.yPos][character.xPos].dataset.appearance === 'o'){
        //this checks whether the character (either playerOne or an enemy) has encountered an enemy
        if (isEnemy){
          if (character.yPos === character.locateCharacter(playerOne)[0] &&
            character.xPos === character.locateCharacter(playerOne)[1]){
            if (character.mode === 'flee'){
              // console.error('wrong detection happening!')
            } else {
              return
            }
          }           
        } 
        character.disappear(tempYPosition, tempXPosition)
        if (isEnemy){
          if (character.dotInMouth === true){
            character.spitOutDot(tempYPosition, tempXPosition)
          }
          character.putDotInMouth()
        }
        character.appear()
      } else {
        adjustCoords(direction, character)
      }
    }


  }

  //END of Player class


  class Enemy extends Player {
    constructor(xPos, yPos, name){
      super(xPos, yPos, name)
      this._lastMove = null
      this._mode = 'chase'
      this.onBridge = true
      this.dotInMouth = false
    }

    set lastMove(lastMove){
      this._lastMove = lastMove
    }

    get lastMove(){
      return this._lastMove
    }

    get mode(){
      return this._mode
    }
    
    set mode(mode){
      this._mode = mode
    }

    locateCharacter(character){
      return [character.yPos, character.xPos]
    }

    checkRight(){
      const checkedRight = this.xPos + 1
      return [this.yPos, checkedRight]
    }

    checkLeft(){
      const checkedLeft = this.xPos - 1
      return [this.yPos, checkedLeft]
    }

    checkUp(){
      const checkedUp = this.yPos - 1
      return [checkedUp, this.xPos]
    }

    checkDown(){
      const checkedDown = this.yPos + 1
      return [checkedDown, this.xPos]
    }

    decideDirection(character){
      const checkedRight = this.checkRight()
      const checkedLeft = this.checkLeft()
      const checkedUp = this.checkUp()
      const checkedDown = this.checkDown()
      const characterPosition = this.locateCharacter(character)
      
      //>>>>>>>>>>>>>>>> REFACTOR >>>>>>>>>>>>>>>>>
      const rightWeight = [Math.abs(characterPosition[0] - checkedRight[0]) + Math.abs(characterPosition[1] - checkedRight[1]), 'right']
      const leftWeight = [Math.abs(characterPosition[0] - checkedLeft[0]) + Math.abs(characterPosition[1] - checkedLeft[1]), 'left']
      const upWeight = [Math.abs(characterPosition[0] - checkedUp[0]) + Math.abs(characterPosition[1] - checkedUp[1]), 'up']
      const downWeight = [Math.abs(characterPosition[0] - checkedDown[0]) + Math.abs(characterPosition[1] - checkedDown[1]), 'down']
      
      let orderToChoose
      if (this.mode !== 'flee'){
        orderToChoose = [rightWeight, leftWeight, upWeight, downWeight].sort((a, b) => {
          if (a[0] - b[0] === 0){
            const optionsToChoose = [-1, 1]
            return optionsToChoose[Math.floor(Math.random() * optionsToChoose.length)]
          } else {
            return a[0] - b[0]
          } 
        })
      } else {
        orderToChoose = [rightWeight, leftWeight, upWeight, downWeight].sort((a, b) => b[0] - a[0] )
      }
      
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      let count = 0
      while (tempXPosition === this.xPos && tempYPosition === this.yPos){
        const directionToCheck = orderToChoose[count][1]
        if (directionToCheck === 'right' && this.lastMove !== 'left'){
          this.moveRight(true)
          this.lastMove = 'right'
        } else if (directionToCheck === 'left' && this.lastMove !== 'right') {
          this.moveLeft(true)
          this.lastMove = 'left'
        } else if (directionToCheck === 'up' && this.lastMove !== 'down') {
          this.moveUp(true)
          this.lastMove = 'up'
        } else if (directionToCheck === 'down' && this.lastMove !== 'up') {
          this.moveDown(true)
          this.lastMove = 'down'
        } else {
          return
        }
        count++

      }

    }

  }

  // END of Enemy class





  function adjustCoords(direction, character){
    if (direction === 'right'){
      character.xPos = character.xPos - 1
    } else if (direction === 'left') {
      character.xPos = character.xPos + 1
    } else if (direction === 'up') {
      character.yPos = character.yPos + 1
    } else if (direction === 'down') {
      character.yPos = character.yPos - 1
    }
  }

  // Instantiate classes the game characters
  const playerOne = new Player(3,9, 'playerOne')
  const enemyOne = new Enemy(9,8, 'Captain')
  const enemyTwo = new Enemy(9,10, 'Engineer')
  const enemyThree = new Enemy(10,8, 'Weapons')
  const enemyFour = new Enemy(10,10, 'Navigation')
  
  


  function detectCollision(enemy){
    return setInterval(() => {
      if (enemy.locateCharacter(playerOne)[0] === enemy.yPos && enemy.locateCharacter(playerOne)[1] === enemy.xPos){
        if (enemy.mode === 'flee'){
          if (enemy === enemyOne){
            clearInterval(captainTimer)
            captainTimer = null            
            clearInterval(captainTimerFlee)
            captainTimerFlee = null
            clearInterval(enemyOneTimerId)
            enemyOneTimerId = null
            resetDrugged(enemy)
          } else if (enemy === enemyTwo) {
            clearInterval(engineerTimer)
            engineerTimer = null            
            clearInterval(engineerTimerFlee)
            engineerTimerFlee = null
            clearInterval(enemyTwoTimerId)
            enemyTwoTimerId = null
            resetDrugged(enemy)
          } else if (enemy === enemyThree) {
            clearInterval(weaponsTimer)
            weaponsTimer = null            
            clearInterval(weaponsTimerFlee)
            weaponsTimerFlee = null
            clearInterval(enemyThreeTimerId)
            enemyThreeTimerId = null
            resetDrugged(enemy)
          } else if (enemy === enemyFour) {
            clearInterval(navigationTimer)
            navigationTimer = null            
            clearInterval(navigationTimerFlee)
            navigationTimerFlee = null
            clearInterval(enemyFourTimerId)
            enemyFourTimerId = null
            resetDrugged(enemy)
          }
        } else {
          endGame(enemy)
        }

      }   
    }, 40)
  }

  function handleModeChange(enemy){
    if (enemy.mode === 'flee'){
      runGameFlee(enemy)
    } else if (enemy.mode === 'chase'){
      runGameChase(enemy)
    }
  }

  function runGameFlee(enemy){
    if (enemy === enemyOne){
      captainTimerFlee = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 1000)
      fleeDirectionTimers.add(captainTimerFlee)
    } else if (enemy === enemyTwo){
      engineerTimerFlee = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 1000)
      fleeDirectionTimers.add(engineerTimerFlee)
    } else if (enemy === enemyThree){
      weaponsTimerFlee = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 1000)
      fleeDirectionTimers.add(weaponsTimerFlee)
    } else if (enemy === enemyFour){
      navigationTimerFlee = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 1000)
      fleeDirectionTimers.add(navigationTimerFlee)
    }
  }

  function runGameChase(enemy){
    if (enemy === enemyOne){
      captainTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 400)
      chaseDirectionTimers.add(captainTimer)
    } else if (enemy === enemyTwo){
      engineerTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 300)
      chaseDirectionTimers.add(engineerTimer)
    } else if (enemy === enemyThree){
      weaponsTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 450)
      chaseDirectionTimers.add(weaponsTimer)
    } else if (enemy === enemyFour){
      navigationTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 500)
      chaseDirectionTimers.add(navigationTimer)
    }
  }

  //helper function that will be called by playerOne when encountering a big dot, triggers all enemies to flee for set time
  function bigDotTriggerFlee(){
    chaseDirectionTimers.forEach(timer => {
      clearInterval(timer)
    })
    chaseDirectionTimers.clear()

    fleeDirectionTimers.forEach(timer => {
      clearInterval(timer)
    })
    fleeDirectionTimers.clear()
    
    enemyOne.mode = 'flee'
    enemyTwo.mode = 'flee'
    enemyThree.mode = 'flee'
    enemyFour.mode = 'flee'
    
    handleModeChange(enemyOne)
    handleModeChange(enemyTwo)
    handleModeChange(enemyThree)
    handleModeChange(enemyFour)

    const druggedMessage = document.createElement('div')
    druggedMessage.innerText = 'CREW DRUGGED! Grab them to send back to the Bridge.'
    druggedMessage.style.display = 'inline-block'
    druggedMessage.style.color = 'chartreuse'
    lives.appendChild(druggedMessage)
    setTimeout(() => {
      lives.removeChild(druggedMessage)
    }, 2500)

    setTimeout(() => {
      chaseDirectionTimers.forEach(timer => {
        clearInterval(timer)
      })
      chaseDirectionTimers.clear()
  
      fleeDirectionTimers.forEach(timer => {
        clearInterval(timer)
      })
      fleeDirectionTimers.clear()
      
      enemyOne.mode = 'chase'
      enemyTwo.mode = 'chase'
      enemyThree.mode = 'chase'
      enemyFour.mode = 'chase'

      handleModeChange(enemyOne)
      handleModeChange(enemyTwo)
      handleModeChange(enemyThree)
      handleModeChange(enemyFour)
    }, 5000)
  }


  function endGame(character, collisionId){
    
    // console.log('endGame called!')    
    for (let i = 1; i < 9999; i++){
      window.clearInterval(i)
    }

    document.removeEventListener('keyup', handleKey)
    
    if (character.score < winScore){
      collisionSound.play()
      if (currentBoard === boardTwo) {
        playerOne.loseLife()
        if (playerOne.lives === 0){
          //Game over
          gameOverOrWin(character, false)
          return
        }
        handleBoardChange(character)
        return
      } else {
        handleBoardChange(character)
        return
      }  
    } else {
      //Game won
      gameOverOrWin(character, true)
      return
    }
  }

  function gameOverOrWin(character, win = false){
    reset(character)
    dotCount = 0
    gridWrapper.style.display = 'none'
    grid.textContent = ''
    cells = []
    gameSurround.classList.remove('display')
    gameOver.childNodes[0].nextSibling.style.width = '50%'
    gameOver.childNodes[0].nextSibling.style.margin = '20px'
    if (win === true){
      gameOver.childNodes[0].nextSibling.innerHTML = 'Congratulations! You survived long enough to be transfered off of the Nimitz. Good luck to the remaining redshirts onboard!'
      gameOver.classList.add('display')
    } else {
      gameOverSound.play()
      gameOver.childNodes[0].nextSibling.innerHTML = 'Blast it all! Game over. If only you had hidden better'
      gameOver.classList.add('display')
    }
    
    finalScore.textContent = playerOne.score
    restartBtn.addEventListener('click', () => {
      // console.log('playGame called in zero lives state')
      playGame(true)
    })
  }

  function handleBoardChange(character){
    const crewImage = document.createElement('img')
    const missionMessage = document.createElement('p')
    
    if (currentBoard === boardOne){
      missionMessage.style.color = 'chartreuse'
      missionMessage.textContent = 'Ah, there you are, ensign. I need you for an away mission. Seems the crew on our sister ship, the Truman, has gone space-mad. Go over there and try to sort things out.'
    } else {
      missionMessage.style.color = 'red'
      // eslint-disable-next-line quotes
      missionMessage.textContent = "You've been injured by one of the blasted space-mad crew on the Truman! Get back to the Nimitz!."
    }
    slideInMission.appendChild(missionMessage)
    
    crewImage.style.width = '200px'
    if (character.name === 'Captain'){
      if (currentBoard === boardOne) {
        crewImage.setAttribute('src', './styles/captain_normal.png')
      } else {
        crewImage.setAttribute('src', './styles/captain_drugged.png')
      }
    } else if (character.name === 'Engineer'){
      if (currentBoard === boardOne){
        crewImage.setAttribute('src', './styles/engineer_normal.png')
      } else {
        crewImage.setAttribute('src', './styles/engineer_drugged.png')
      }
    } else if (character.name === 'Weapons'){
      if (currentBoard === boardOne){
        crewImage.setAttribute('src', './styles/weapons_normal.png')
      } else {
        crewImage.setAttribute('src', './styles/weapons_drugged.png')
      }
    } else if (character.name === 'Navigation'){
      if (currentBoard === boardOne){
        crewImage.setAttribute('src', './styles/navigation_normal.png')
      } else {
        crewImage.setAttribute('src', './styles/navigation_drugged.png')
      }
    } 
    slideInMission.appendChild(crewImage)    
    slideInMission.classList.add('active')

    document.querySelector('.commence-mission').addEventListener('click', () =>{
      slideInMission.classList.remove('active')
      slideInMission.removeChild(missionMessage)
      slideInMission.removeChild(crewImage)
      reset(character)
      dotCount = 0
      grid.textContent = ''
      // console.log('length of cells before clearing, board one: ', cells.length)
      cells = []

      // console.log('playGame called in endGame, boardOne state')
      playGame()
      return
    })
  }
  

  // reset enemy caught when player has big-dot power. Enemy sent back to home position. Score increased
  function resetDrugged(enemy){
    playerOne.score += 400
    scoreDisplay.textContent = playerOne.score
    enemy.disappear(enemy.yPos, enemy.xPos)
    
    if (currentBoard === boardOne){
      enemy.yPos = 9
      enemy.xPos = 8
    } else {
      enemy.yPos = 11
      enemy.xPos = 9
    }
    setTimeout(() => {
      enemy.appear()
      enemy.mode = 'flee'
      runGameFlee(enemy)
      // if (enemy === enemyOne){
      //   enemyOneTimerId = detectModeChange(enemy)
      // } else if (enemy === enemyTwo){
      //   enemyTwoTimerId = detectModeChange(enemy)
      // } else if (enemy === enemyThree){
      //   enemyThreeTimerId = detectModeChange(enemy)
      // } else if (enemy === enemyFour){
      //   enemyFourTimerId = detectModeChange(enemy)
      // }
      
    }, 1000)
    

  }


  // reset all characters to original position. The character that caught the player will have y or x coord off by one, so needs to be 
  // explicitly targeted in function 
  function reset(characterThatCaught){
    characterThatCaught.disappear(characterThatCaught.yPos, characterThatCaught.xPos)
    playerOne.disappear(playerOne.yPos, playerOne.xPos)
    enemyOne.disappear(enemyOne.yPos, enemyOne.xPos)
    enemyTwo.disappear(enemyTwo.yPos, enemyTwo.xPos)
    enemyThree.disappear(enemyThree.yPos, enemyThree.xPos)
    enemyFour.disappear(enemyFour.yPos, enemyFour.xPos)

    // playerOne.xPos = 1
    // playerOne.yPos = 1
    // enemyOne.xPos = 13
    // enemyOne.yPos = 14
    // enemyTwo.xPos = 14
    // enemyTwo.yPos = 14
    // enemyThree.xPos = 13
    // enemyThree.yPos = 15
    // enemyFour.xPos = 14
    // enemyFour.yPos = 14
  }



  

  function handleKey(event){ 
    switch (event.code){
      case 'ArrowRight':
        playerOne.moveRight()  
        break
      case 'ArrowLeft':
        playerOne.moveLeft()  
        break  
      case 'ArrowUp':
        playerOne.moveUp()  
        break
      case 'ArrowDown':
        playerOne.moveDown()  
        break
    }

  }



    






}


window.addEventListener('DOMContentLoaded', init)