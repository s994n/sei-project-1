

## Redshirt's run

This game, inspired by Pacman (and Star Trek!) involves a player inside a maze, being chased by a group of characters (refered to here as 'enemies').


## Enemy positioning and movement

Before each enemy makes a move, it will decide which direction to move. To do this, the Enemy class has methods (checkRight, checkLeft, checkUp and checkDown) to allow an enemy to determine the coordinates of the cells immediately to the right, left, up and down, around its position. With this information, each enemy can determine whether the cell in question is a passageway (allowing movement), or a wall (dissalowing movement). The enemy can also determine whether any given cell immediately around it is closer or further from the player's position.

Conditions are also added to avoid enemies back-tracking during their movement. Specifically, enemies have a property (lastMove) that stores information about their previous move. This is then used when deciding which move should be made next.

Before each move, each enemy iterates through possible moves (right, left, up or down - also taking into acount its last move, as described above), and using a simple sum of x and y grid cell coordinates, sorts the possible moves into an order with the first move being that which will minimise the straight-line distance to the player position.



