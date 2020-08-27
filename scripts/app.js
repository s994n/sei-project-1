


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
    ['*','O','O','O','O','O','O','O','O','*'],
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
      console.log(this.xPos, this.yPos, cells)
      console.log(cells[this.xPos][this.yPos])
      cells[this.xPos][this.yPos].classList.add('player')
    }

  }


  const playerOne = new Player(0,0)
  playerOne.appear()
  

}


window.addEventListener('DOMContentLoaded', init)