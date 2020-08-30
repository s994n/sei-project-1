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
  ['XXXXoXoXXXXXoXoXXXX'],
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



  const boardTwo =
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
  function generateBoard(inputBoard){
    const splitInputArr = inputBoard.map(subArr => subArr.join('').split('')) 
    for (let y = 0; y < splitInputArr.length; y++){
      const cellsSubArray = []
      for (let x = 0; x < splitInputArr[1].length; x++){
        const cell = document.createElement('div')
        cell.setAttribute('data-appearance',`${splitInputArr[y][x]}`)
        cell.style.height = `${100 / splitInputArr.length}%`
        cell.style.width = `${100 / splitInputArr[0].length}%`
        //To allow styling and behavior of all passageways
        if (cell.dataset.appearance === 'o'){
          
          //To include dots, big dots, pills and service passages
          if ((y === 1 && x === 1) ||
          (y === 1 && x === splitInputArr[0].length - 2) || 
          (y === splitInputArr.length - 2 && x === 1) ||
          (y === splitInputArr.length - 2 && x === splitInputArr[0].length - 2)){
            if (inputBoard === boardOne){
            // eslint-disable-next-line quotes
              cell.innerHTML = "<span class='pill-dot'></span>"
            } else if (inputBoard === boardTwo){
              // eslint-disable-next-line quotes
              cell.innerHTML = "<span class='big-dot'></span>"
              } 
          } else if (x === 0 || x === splitInputArr[0].length - 1) {
            // eslint-disable-next-line quotes
            cell.innerHTML = "<span class='service-tunnel'></span>"
          } else {
              if (inputBoard === boardOne){
                // eslint-disable-next-line quotes
                  cell.innerHTML = "<span class='dot'></span>"
                }
            if (inputBoard === boardTwo){
            // eslint-disable-next-line quotes
              cell.innerHTML = "<span class='emergency-dot'></span>"
              }
          }

          if (inputBoard === boardOne){
            cell.classList.add('passageway-light')

          } else if (inputBoard === boardTwo) {
            cell.classList.add('passageway-dark')
          }


        }
        grid.appendChild(cell)
        cellsSubArray.push(cell)
      }
      cells.push(cellsSubArray)
    }
  }
  
  generateBoard(boardTwo.reverse())


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
      console.log(cells)
      
    }
    disappear(yPos, xPos){
      cells[yPos][xPos].classList.remove(`${this.name}`)
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
      mover(this, 'right', tempXPosition, tempYPosition, isEnemy)
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
      if ((isEnemy === false && cells[this.yPos][this.xPos].children[0].classList.contains('dot')) ||
      (isEnemy === false && cells[this.yPos][this.xPos].children[0].classList.contains('emergency-dot'))){
        cells[this.yPos][this.xPos].children[0].classList.remove('dot')
        cells[this.yPos][this.xPos].children[0].classList.remove('emergency-dot')
        this.score += 10
        scoreDisplay.textContent = playerOne.score
      } else if ((isEnemy === false && cells[this.yPos][this.xPos].children[0].classList.contains('big-dot')) ||
      (isEnemy === false && cells[this.yPos][this.xPos].children[0].classList.contains('pill-dot'))){
        cells[this.yPos][this.xPos].children[0].classList.remove('big-dot')
        cells[this.yPos][this.xPos].children[0].classList.remove('pill-dot')
        this.score += 50
        scoreDisplay.textContent = playerOne.score
        bigDotTriggerFlee()
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
        // console.log('chasing!', [rightWeight, leftWeight, upWeight, downWeight])
        orderToChoose = [rightWeight, leftWeight, upWeight, downWeight].sort((a, b) => {
          // console.log(a, b, a[0] - b[0])
          if (a[0] - b[0] === 0){
            const optionsToChoose = [-1, 1]
            return optionsToChoose[Math.floor(Math.random() * optionsToChoose.length)]
          } else {
            return a[0] - b[0]
          } 
        })
        // console.log('Chasing smart!', orderToChoose)
      } else {
        // console.log('fleeing!', [rightWeight, leftWeight, upWeight, downWeight])
        orderToChoose = [rightWeight, leftWeight, upWeight, downWeight].sort((a, b) => b[0] - a[0] )
      }
      
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      let count = 0
      while (tempXPosition === this.xPos && tempYPosition === this.yPos){
        console.log('mover:', this.name, 'count:', count)
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
          console.log('throwing error?')
        }
        count++

      }
      console.log('count outside while loop:', count)

    }

  }

// END of Enemy class


//helper function responsible for moving (disappearing and appearing) all characters
// Includes some logic for collision handling, under conditions of chase vs flee for enemies  
  function mover(character, direction, tempXPosition, tempYPosition, isEnemy){

    if (cells[character.yPos][character.xPos].dataset.appearance === 'o'){
      
      //this checks whether the character (either playerOne or an enemy) has encountered an enemy
      if (isEnemy){
        // console.log(character.yPos,character.xPos)
        // if (cells[character.yPos][character.xPos].classList.value === 'playerOne'){
        //       alert('collision!')
        //     }
        if (character.yPos === character.locateCharacter(playerOne)[0] &&
          character.xPos === character.locateCharacter(playerOne)[1]){
            if (character.mode === 'flee'){
              console.log('wrong detection!')
            } else {
              // adjustCoords(direction, character)
              // endGame(character)
              return
            }

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
  let captainTimerFlee
  let engineerTimerFlee
  let weaponsTimerFlee
  let navigationTimerFlee
  let enemyOneTimerId
  let enemyTwoTimerId
  let enemyThreeTimerId
  let enemyFourTimerId

  function playGame(){

    document.addEventListener('keyup', handleKey)
    
    playerOne.appear()
    enemyOne.appear()
    enemyTwo.appear()
    enemyThree.appear()
    enemyFour.appear()

    runGameChase(enemyOne)
    runGameChase(enemyTwo)
    runGameChase(enemyThree)
    runGameChase(enemyFour)

      // captainTimer = setInterval(() => {
      //   enemyOne.decideDirection(playerOne)
      // }, 700)
      // engineerTimer = setInterval(() => {
      // enemyTwo.decideDirection(playerOne)
      // }, 1000)
      // weaponsTimer = setInterval(() => {
      // enemyThree.decideDirection(playerOne)
      // }, 1500)
      // navigationTimer = setInterval(() => {
      // enemyFour.decideDirection(playerOne)
      // }, 2000)
      

    // setTimeout(() => {
    //   enemyOne.mode = 'flee'
    //   enemyTwo.mode = 'flee'
    //   enemyThree.mode = 'flee'
    //   enemyFour.mode = 'flee'
    // }, 4000)

    console.log(cells)


    enemyOneTimerId = detectModeChange(enemyOne)
    enemyTwoTimerId = detectModeChange(enemyTwo)
    enemyThreeTimerId = detectModeChange(enemyThree)
    enemyFourTimerId = detectModeChange(enemyFour)


    detectCollision(enemyOne)
    detectCollision(enemyTwo)
    detectCollision(enemyThree)
    detectCollision(enemyFour)
    
  }


  function detectCollision(enemy){
    console.log('running detect collision and setting interval!')
    const collisionId = setInterval(() => {
      if (enemy.locateCharacter(playerOne)[0] === enemy.yPos && enemy.locateCharacter(playerOne)[1] === enemy.xPos){
        if (enemy.mode === 'flee'){
          if (enemy === enemyOne){
            // console.log(`caught ${enemy}, clearing timer IDs. decideDirection: ${captainTimer}, detectModeChange: ${enemyOneTimerId}`)
            clearInterval(captainTimer)
            captainTimer = null            
            clearInterval(captainTimerFlee)
            captainTimerFlee = null
            clearInterval(enemyOneTimerId)
            enemyOneTimerId = null
            // console.log(`CLEARED timer IDs. decideDirection: ${captainTimer}, detectModeChange: ${enemyOneTimerId}`)
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
          clearInterval(collisionId)
          endGame(enemy)
        }

      } 
    }, 40)
  }

  function detectModeChange(enemy){
    
    let currentEnemyMode = enemy.mode
    const enemyCheckerId = setInterval(() => {
      // console.log('should show:', enemy.mode)
      if (currentEnemyMode !== enemy.mode){
        if (enemy.mode === 'flee'){
          clearInterval(captainTimer)
          clearInterval(engineerTimer)
          clearInterval(weaponsTimer)
          clearInterval(navigationTimer)
        } else if (enemy.mode === 'chase') {
          // console.log(enemy.mode, 'clearing flee timers')
          clearInterval(captainTimerFlee)
          clearInterval(engineerTimerFlee)
          clearInterval(weaponsTimerFlee)
          clearInterval(navigationTimerFlee)
        }
        handleModeChange(enemy)
      }
      currentEnemyMode = enemy.mode
       
    }, 50)
    return enemyCheckerId
  }



  // function determineTimerId(enemy){
  //   let timerId
  //   if (enemy === enemyOne){
  //     timerId = captainTimer
  //   } else if (enemy === enemyTwo){
  //     timerId = engineerTimer
  //   } else if (enemy === enemyThree){
  //     timerId = weaponsTimer
  //   } else if (enemy === enemyFour){
  //     timerId = navigationTimer
  //   }
  //   return timerId
  // }


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
    } else if (enemy === enemyTwo){
      engineerTimerFlee = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 1000)
    } else if (enemy === enemyThree){
      weaponsTimerFlee = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 1000)
    } else if (enemy === enemyFour){
      navigationTimerFlee = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 1000)
    }
  }

  function runGameChase(enemy){
    if (enemy === enemyOne){
      captainTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 500)
    } else if (enemy === enemyTwo){
      engineerTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 500)
    } else if (enemy === enemyThree){
      weaponsTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 500)
    } else if (enemy === enemyFour){
      navigationTimer = setInterval(() => {
        enemy.decideDirection(playerOne)
      }, 500)
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
    }, 10000)
  }


  function endGame(character){
    clearInterval(captainTimer)
    clearInterval(engineerTimer)
    clearInterval(weaponsTimer)
    clearInterval(navigationTimer)

    clearInterval(enemyOneTimerId)
    enemyOneTimerId = null
    clearInterval(enemyTwoTimerId)
    enemyTwoTimerId = null
    clearInterval(enemyThreeTimerId)
    enemyThreeTimerId = null
    clearInterval(enemyFourTimerId)
    enemyFourTimerId = null
    alert(`Oh no, you got caught by ${character.name}`)
    resetButton.addEventListener('click', () => {
      reset(character)
    }) 
  }
  

// reset enemy caught when player has big-dot power. Enemy sent back to home position. Score increased
  function resetDrugged(enemy){
    console.log(`resetting ${enemy.name} with drug!`)
    playerOne.score += 400
    scoreDisplay.textContent = playerOne.score
    enemy.disappear(enemy.yPos, enemy.xPos)
    enemy.yPos = 14
    enemy.xPos = 13
    setTimeout(() => {
      enemy.appear()
      enemy.mode = 'chase'
      runGameChase(enemy)
      if (enemy === enemyOne){
        enemyOneTimerId = detectModeChange(enemy)
      } else if (enemy === enemyTwo){
        enemyTwoTimerId = detectModeChange(enemy)
      } else if (enemy === enemyThree){
        enemyThreeTimerId = detectModeChange(enemy)
      } else if (enemy === enemyFour){
        enemyFourTimerId = detectModeChange(enemy)
      }
      
    }, 2000)
    

    // setTimeout(() => {

    //   enemy.appear()
    //   enemyOneTimerId = detectModeChange(enemyOne)
    //   console.log(`${enemy.name} reset! Mode: ${enemy.mode}. TimerId: ${enemyOneTimerId}`)
    //   runGameChase(enemy)
    // }, 3000)
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