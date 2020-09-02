

## Redshirt's run

This game, inspired by Pacman (and Star Trek!) involves a player inside a maze, being chased by a group of characters (refered to here as 'enemies').


## Enemy positioning and movement

Before each enemy makes a move, it will decide which direction to move. To do this, the Enemy class has methods (checkRight, checkLeft, checkUp and checkDown) to allow an enemy to determine the coordinates of the cells immediately to the right, left, up and down, around its position. With this information, each enemy can determine whether the cell in question is a passageway (allowing movement), or a wall (dissalowing movement). The enemy can also determine whether any given cell immediately around it is closer or further from the player's position.

Conditions are also added to avoid enemies back-tracking during their movement. Specifically, enemies have a property (lastMove) that stores information about their previous move. This is then used when deciding which move should be made next.

Before each move, each enemy iterates through moves (right, left, up or down - also taking into acount its last move, as described above), and using a simple sum of x and y grid cell coordinates, sorts the possible moves into an order of desired movement. 

When the enemy is in 'chase' mode, the sorting order results in the first move to try (the most desirable move) being that which will minimise the straight-line distance to the player position. If there are two or more potential moves that offer equal reduction in distance to the player, a random choice is made between these desired moves.

Conversely, when the enemy is in 'flee' mode (after the player has landed on one of the pills on the board), the movement sorting order is reversed: the first move that the enemy will try is the move that will result in the greatest possible increase in straight-line distance from the player's current position.

Now with a desired order of movement, the enemy will assess whether it is possible to move in each direction. The enemy will try to move in each direction, sorted as described above, until it is able to successfully make a move (until its x-y coordinates change).



