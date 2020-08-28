


function init(){


  const grid = document.querySelector('.grid')
  const cells = []
  
  console.log(grid)

  const inputArr = 
  [['*','*','*','*','*','*','*','*','*','*'],
    ['*','O','O','O','O','O','O','O','O','*'],
    ['*','O','O','O','O','O','O','O','O','*'],
    ['*','O','O','O','O','O','O','O','O','*'],
    ['*','O','O','O','O','O','O','O','O','*'],
    ['*','O','O','O','O','O','O','O','O','*'],
    ['*','O','O','O','O','O','O','O','O','*'],
    ['*','O','O','O','O','O','O','O','O','*'],
    ['*','O','O','O','O','O','O','O','B','*'],
    ['*','*','*','*','*','*','*','*','*','*']]




  for (let y = 0; y < inputArr.length; y++){
    const cellsSubArray = []
    for (let x = 0; x < inputArr[1].length; x++){
      const cell = document.createElement('div')
      cell.setAttribute('data-appearance',`${inputArr[x][y]}`)
      grid.appendChild(cell)
      cellsSubArray.push(cell)
    }
    cells.push(cellsSubArray)
  }


  class Player {
    constructor(xPos, yPos){
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
          console.log('moving right!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
          this.moveRight()
          console.log('MOVED right!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
        } else if (directionToCheck === 'left') {
          console.log('moving left!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
          this.moveLeft()
          console.log('MOVED left!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
        } else if (directionToCheck === 'up') {
          console.log('moving up!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
          this.moveUp()
          console.log('MOVED up!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
        } else if (directionToCheck === 'down') {
          console.log('moving down!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
          this.moveDown()
          console.log('MOVED down!', [tempYPosition, tempXPosition], [this.xPos, this.yPos])
        }
        count++
      }



    }


  }

  function mover(character, direction, tempXPosition, tempYPosition){

    if (cells[character.yPos][character.xPos].dataset.appearance === 'O'){
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

  const enemyOne = new Enemy(8,8)
  enemyOne.appear()

  setTimeout(() => {
    playerOne.moveRight()
    enemyOne.locateCharacter(playerOne)
    enemyOne.decideDirection(playerOne)


    playerOne.moveRight()
    enemyOne.decideDirection(playerOne)


  }, 4000)


}


window.addEventListener('DOMContentLoaded', init)