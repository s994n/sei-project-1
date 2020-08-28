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

  const splitInputArr = inputArr.map(subArr => subArr.join('').split(''))
 

  for (let y = 0; y < splitInputArr.length; y++){
    const cellsSubArray = []
    for (let x = 0; x < splitInputArr[1].length; x++){
      const cell = document.createElement('div')
      cell.setAttribute('data-appearance',`${splitInputArr[y][x]}`)
      if (cell.dataset.appearance === 'o'){
        cell.innerHTML = "<span class='dot'></span>"
      }
      grid.appendChild(cell)
      cellsSubArray.push(cell)
    }
    cells.push(cellsSubArray)
  }



  class Player {
    constructor(yPos, xPos, name){
      this.xPos = xPos
      this.yPos = yPos
      this.name = name
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
      console.log(cells[this.yPos][this.xPos].children[0])
    }
    moveLeft(isEnemy = false){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      this.xPos = this.xPos - 1
      mover(this, 'left', tempXPosition, tempYPosition, isEnemy)
    }
    moveUp(isEnemy = false){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      this.yPos = this.yPos - 1
      mover(this, 'up', tempXPosition, tempYPosition, isEnemy)
    }
    moveDown(isEnemy = false){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      this.yPos = this.yPos + 1
      mover(this, 'down', tempXPosition, tempYPosition, isEnemy)
    }
  }


  class Enemy extends Player {
    constructor(xPos, yPos, name){
      super(xPos, yPos, name)
      this._lastMove = null
    }

    set lastMove(lastMove){
      this._lastMove = lastMove
    }

    get lastMove(){
      return this._lastMove
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
      
      const orderToChoose = [rightWeight, leftWeight, upWeight, downWeight].sort((a, b) => a[0] - b[0] )
      
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
      }, 400)
      engineerTimer = setInterval(() => {
      enemyTwo.decideDirection(playerOne)
      }, 500)
      weaponsTimer = setInterval(() => {
      enemyThree.decideDirection(playerOne)
      }, 300)
      navigationTimer = setInterval(() => {
      enemyFour.decideDirection(playerOne)
      }, 750)

    }, 2000)

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



}


window.addEventListener('DOMContentLoaded', init)