/* eslint-disable indent */



function init(){


  const grid = document.querySelector('.grid')
  const cells = []
  

  // const inputArr = 
  // [['XXXXXXXXXX'],
  //  ['XooooooooX'],
  //  ['XooooooooX'],
  //  ['XooooooooX'],
  //  ['XooooooooX'],
  //  ['XooooooooX'],
  //  ['XooooooooX'],
  //  ['XooooooooX'],
  //  ['XooooooooX'],
  //  ['XooooooooX'],
  //  ['XXXXXXXXXX']
  // ]
  

  const inputArr =
[
  ['XXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
  ['XooooooooooooXXooooooooooooX'],
  ['XoXXXXoXXXXXoXXoXXXXXoXXXXoX'],
  ['XoXXXXoXXXXXoXXoXXXXXoXXXXoX'],
  ['XoXXXXoXXXXXoXXoXXXXXoXXXXoX'],
  ['XooooooooooooooooooooooooooX'],
  ['XoXXXXoXXoXXXXXXXXoXXoXXXXoX'],
  ['XoXXXXoXXoXXXXXXXXoXXoXXXXoX'],
  ['XooooooXXooooXXooooXXooooooX'],
  ['XXXXXXoXXXXXoXXoXXXXXoXXXXXX'],
  ['XXXXXXoXXXXXoXXoXXXXXoXXXXXX'],
  ['XXXXXXoXXooooooooooXXoXXXXXX'],
  ['XXXXXXoXXoXXXooXXXoXXoXXXXXX'],
  ['XXXXXXoXXoXooooooXoXXoXXXXXX'],
  ['ooooooooooXooooooXoooooooooo'],
  ['XXXXXXoXXoXooooooXoXXoXXXXXX'],
  ['XXXXXXoXXoXXXXXXXXoXXoXXXXXX'],
  ['XXXXXXoXXooooooooooXXoXXXXXX'],
  ['XXXXXXoXXoXXXXXXXXoXXoXXXXXX'],
  ['XXXXXXoXXoXXXXXXXXoXXoXXXXXX'],
  ['XooooooooooooXXooooooooooooX'],
  ['XoXXXXoXXXXXoXXoXXXXXoXXXXoX'],
  ['XoXXXXoXXXXXoXXoXXXXXoXXXXoX'],
  ['XoooXXooooooooooooooooXXoooX'],
  ['XXXoXXoXXoXXXXXXXXoXXoXXoXXX'],
  ['XXXoXXoXXoXXXXXXXXoXXoXXoXXX'],
  ['XooooooXXooooXXooooXXooooooX'],
  ['XoXXXXXXXXXXoXXoXXXXXXXXXXoX'],
  ['XoXXXXXXXXXXoXXoXXXXXXXXXXoX'],
  ['XooooooooooooooooooooooooooX'],
  ['XXXXXXXXXXXXXXXXXXXXXXXXXXXX']
]


//map the input array to a new array with each letter of inputArr as an individual array element
  const splitInputArr = inputArr.map(subArr => subArr.join('').split('')) 
  for (let y = 0; y < splitInputArr.length; y++){
    const cellsSubArray = []
    for (let x = 0; x < splitInputArr[1].length; x++){
      const cell = document.createElement('div')
      cell.setAttribute('data-appearance',`${splitInputArr[y][x]}`)
      
      if (cell.dataset.appearance === 'o'){
        if ((y === 1 && x === 1) ||
        (y === 1 && x === splitInputArr[0].length - 2) || 
        (y === splitInputArr.length - 2 && x === 1) ||
        (y === splitInputArr.length - 2 && x === splitInputArr[0].length - 2)){
          // eslint-disable-next-line quotes
          cell.innerHTML = "<span class='big-dot'></span>"
        } else {
          // eslint-disable-next-line quotes
          cell.innerHTML = "<span class='dot'></span>"
        }
      }
      grid.appendChild(cell)
      cellsSubArray.push(cell)
    }
    cells.push(cellsSubArray)
  }


// define a class of Player, which will be instantiated as playerOne
// Player will be parent class of Enemy class
  class Player {
    constructor(yPos, xPos, name, score = 0){
      this.xPos = xPos
      this.yPos = yPos
      this.name = name
      this.score = score
    }
    appear(){
      cells[this.yPos][this.xPos].classList.add(`${this.name}`)
    }
    disappear(yPos, xPos){
      cells[yPos][xPos].classList.remove(`${this.name}`)
    }
    moveRight(isEnemy = false){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      this.xPos = this.xPos + 1
      mover(this, 'right', tempXPosition, tempYPosition, isEnemy)
      this.checkEatDot(isEnemy)
    }
    moveLeft(isEnemy = false){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      this.xPos = this.xPos - 1
      mover(this, 'left', tempXPosition, tempYPosition, isEnemy)
      this.checkEatDot(isEnemy)
    }
    moveUp(isEnemy = false){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      this.yPos = this.yPos - 1
      mover(this, 'up', tempXPosition, tempYPosition, isEnemy)
      this.checkEatDot(isEnemy)
    }
    moveDown(isEnemy = false){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      this.yPos = this.yPos + 1
      mover(this, 'down', tempXPosition, tempYPosition, isEnemy)
      this.checkEatDot(isEnemy)
    }
//A method to check whether the cell that the player inhabits contains either a dot or a big-dot class
// if dot or big-dot classes are present, score is increased accordingly
    checkEatDot(isEnemy){
      if (isEnemy === false && cells[this.yPos][this.xPos].children[0].classList.contains('dot')){
        cells[this.yPos][this.xPos].children[0].classList.remove('dot')
        this.score += 10
        scoreDisplay.textContent = playerOne.score
      } else if (isEnemy === false && cells[this.yPos][this.xPos].children[0].classList.contains('big-dot')){
        cells[this.yPos][this.xPos].children[0].classList.remove('big-dot')
        this.score += 50
        scoreDisplay.textContent = playerOne.score
        bigDotTriggerFlee()
      }
    }

  }


  class Enemy extends Player {
    constructor(xPos, yPos, name){
      super(xPos, yPos, name)
      this._lastMove = null
      this._mode = 'chase'
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
        orderToChoose = [rightWeight, leftWeight, upWeight, downWeight].sort((a, b) => a[0] - b[0] )
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
          // console.log('MOVED right!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
        } else if (directionToCheck === 'left' && this.lastMove !== 'right') {
          // console.log('moving left!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
          this.moveLeft(true)
          this.lastMove = 'left'
          // console.log('MOVED left!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
        } else if (directionToCheck === 'up' && this.lastMove !== 'down') {
          // console.log('moving up!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
          this.moveUp(true)
          this.lastMove = 'up'
          // console.log('MOVED up!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
        } else if (directionToCheck === 'down' && this.lastMove !== 'up') {
          // console.log('moving down!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
          this.moveDown(true)
          this.lastMove = 'down'
          // console.log('MOVED down!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
        }
        count++

      }

    }

  }

  function mover(character, direction, tempXPosition, tempYPosition, isEnemy){

    if (cells[character.yPos][character.xPos].dataset.appearance === 'o'){
      if (isEnemy){
        if (character.yPos === character.locateCharacter(playerOne)[0] && character.xPos === character.locateCharacter(playerOne)[1] ){
          adjustCoords(direction, character)
          endGame(character)
          return
        }           
      } 
      character.disappear(tempYPosition, tempXPosition)
      character.appear()
    } else if (cells[character.yPos][character.xPos].dataset.appearance === 'B') {
      console.log('Game over!!')
      return
    } else {
      adjustCoords(direction, character)
    }
  }


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


  const playerOne = new Player(1,1, 'playerOne')
  const enemyOne = new Enemy(14,13, 'Captain')
  const enemyTwo = new Enemy(14,14, 'Engineer')
  const enemyThree = new Enemy(15,13, 'Weapons')
  const enemyFour = new Enemy(15,14, 'Navigation')
  
  let captainTimer
  let engineerTimer
  let weaponsTimer
  let navigationTimer


  function playGame(){

    document.addEventListener('keyup', handleKey)
    
    playerOne.appear()
    enemyOne.appear()
    enemyTwo.appear()
    enemyThree.appear()
    enemyFour.appear()

    setTimeout(() => {

      captainTimer = setInterval(() => {
        enemyOne.decideDirection(playerOne)
      }, 300)
      engineerTimer = setInterval(() => {
      enemyTwo.decideDirection(playerOne)
      }, 700)
      weaponsTimer = setInterval(() => {
      enemyThree.decideDirection(playerOne)
      }, 700)
      navigationTimer = setInterval(() => {
      enemyFour.decideDirection(playerOne)
      }, 750)

    }, 2000)

    // setTimeout(() => {
    //   enemyOne.mode = 'flee'
    //   enemyTwo.mode = 'flee'
    //   enemyThree.mode = 'flee'
    //   enemyFour.mode = 'flee'
    // }, 4000)




    const enemyOneTimerId = detectModeChange(enemyOne)
    const enemyTwoTimerId = detectModeChange(enemyTwo)
    const enemyThreeTimerId = detectModeChange(enemyThree)
    const enemyFourTimerId = detectModeChange(enemyFour)

  }


  function detectModeChange(enemy){
    let currentEnemyMode = enemy.mode
    const enemyCheckerId = setInterval(() => {
      if (currentEnemyMode !== enemy.mode){
        const timerId = determineTimerId(enemy)
        clearInterval(timerId)
        handleModeChange(enemy, timerId)
      }
      currentEnemyMode = enemy.mode  
    }, 50)
    return enemyCheckerId
  }

  function determineTimerId(enemy){
    let timerId
    if (enemy === enemyOne){
      timerId = captainTimer
    } else if (enemy === enemyTwo){
      timerId = engineerTimer
    } else if (enemy === enemyThree){
      timerId = weaponsTimer
    } else if (enemy === enemyFour){
      timerId = navigationTimer
    }
    return timerId
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
      captainTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 1000)
    } else if (enemy === enemyTwo){
      engineerTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 1000)
    } else if (enemy === enemyThree){
      weaponsTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 1000)
    } else if (enemy === enemyFour){
      navigationTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 1000)
    }
  }

  function runGameChase(enemy){
    console.log('running in chase mode!')
    if (enemy === enemyOne){
      captainTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 300)
    } else if (enemy === enemyTwo){
      engineerTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 300)
    } else if (enemy === enemyThree){
      weaponsTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 300)
    } else if (enemy === enemyFour){
      navigationTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 300)
    }
  }

//helper function that will be called by playerOne when encountering a big dot, triggers all enemies to flee for set time
  function bigDotTriggerFlee(){
    enemyOne.mode = 'flee'
    enemyTwo.mode = 'flee'
    enemyThree.mode = 'flee'
    enemyFour.mode = 'flee'


    setTimeout(() => {
      enemyOne.mode = 'chase'
      enemyTwo.mode = 'chase'
      enemyThree.mode = 'chase'
      enemyFour.mode = 'chase'
    }, 5000)
  }


  function endGame(character){
    clearInterval(captainTimer)
    clearInterval(engineerTimer)
    clearInterval(weaponsTimer)
    clearInterval(navigationTimer)
    alert(`Oh no, you got caught by ${character.name}`)
    resetButton.addEventListener('click', () => {
      reset(character)
    }) 
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

    playerOne.xPos = 1
    playerOne.yPos = 1
    enemyOne.xPos = 13
    enemyOne.yPos = 14
    enemyTwo.xPos = 14
    enemyTwo.yPos = 14
    enemyThree.xPos = 13
    enemyThree.yPos = 15
    enemyFour.xPos = 14
    enemyFour.yPos = 14
  }


  // Listen for user input and handle it
  const startButton = document.querySelector('.start')
  const resetButton = document.querySelector('.reset')
  

  startButton.addEventListener('click', playGame)
  

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

  // score display
 const scoreDisplay = document.querySelector('.score')




}


window.addEventListener('DOMContentLoaded', init)