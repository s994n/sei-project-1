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
      grid.appendChild(cell)
      cellsSubArray.push(cell)
    }
    cells.push(cellsSubArray)
  }

  // console.log(cells)


  class Player {
    constructor(yPos, xPos){
      this.xPos = xPos
      this.yPos = yPos
    }
    appear(){
      cells[this.yPos][this.xPos].classList.add('player')
    }
    disappear(yPos, xPos){
      cells[yPos][xPos].classList.remove('player')
    }
    moveRight(){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      this.xPos = this.xPos + 1
      mover(this, 'right', tempXPosition, tempYPosition)
    }
    moveLeft(){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      this.xPos = this.xPos - 1
      mover(this, 'left', tempXPosition, tempYPosition)
    }
    moveUp(){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      this.yPos = this.yPos - 1
      mover(this, 'up', tempXPosition, tempYPosition)
    }
    moveDown(){
      const tempXPosition = this.xPos
      const tempYPosition = this.yPos
      this.yPos = this.yPos + 1
      mover(this, 'down', tempXPosition, tempYPosition)
    }
  }


  class Enemy extends Player {
    constructor(xPos, yPos){
      super(xPos, yPos)
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
        if (directionToCheck === 'right'){
          // console.log('moving right!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
          this.moveRight()
          this.lastMove = 'right'
          // console.log('MOVED right!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
        } else if (directionToCheck === 'left') {
          // console.log('moving left!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
          this.moveLeft()
          this.lastMove = 'left'
          // console.log('MOVED left!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
        } else if (directionToCheck === 'up') {
          // console.log('moving up!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
          this.moveUp()
          this.lastMove = 'up'
          // console.log('MOVED up!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
        } else if (directionToCheck === 'down') {
          // console.log('moving down!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
          this.moveDown()
          this.lastMove = 'down'
          // console.log('MOVED down!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
        }
        count++
      }



    }


  }

  function mover(character, direction, tempXPosition, tempYPosition){

    if (cells[character.yPos][character.xPos].dataset.appearance === 'o'){
      character.disappear(tempYPosition, tempXPosition)
      character.appear()
    } else if (cells[character.yPos][character.xPos].dataset.appearance === 'B') {
      console.log('Game over!!')
      return
    } else {
      if (direction === 'right'){
        character.xPos = character.xPos - 1
      } else if (direction === 'left') {
        character.xPos = character.xPos + 1
      } else if (direction === 'up') {
        character.yPos = character.yPos + 1
      } else if (direction === 'down') {
        character.yPos = character.yPos - 1
      }
      // >>>>>>>>>>>>>>>>> return true for while not moved on enemy class

    }
  }


  const playerOne = new Player(1,1)
  playerOne.appear()

  const enemyOne = new Enemy(14,13)
  const enemyTwo = new Enemy(14,14)
  const enemyThree = new Enemy(15,13)
  const enemyFour = new Enemy(15,14)
  enemyOne.appear()
  enemyTwo.appear()
  enemyThree.appear()
  enemyFour.appear()

  setTimeout(() => {

    enemyOne.decideDirection(playerOne)

    // setInterval(() => {
    //   enemyOne.decideDirection(playerOne)
    // }, 500)
    // setInterval(() => {
    //   enemyTwo.decideDirection(playerOne)
    // }, 500)

  }, 4000)


  // Listen for user input and handle it

  document.addEventListener('keyup', handleKey)

  function handleKey(event){ 
    console.log(event.code)
    
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