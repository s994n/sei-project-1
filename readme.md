

## Redshirt's run

This game, inspired by Pacman (and Star Trek!) involves a player inside a maze, being chased by a group of characters (refered to here as 'enemies').


## Enemy chase and flee modes

The Enemy class has a mode -- with a value of either 'chase', or 'flee' -- that determines how it behaves with respect to the player. Upon instantiation of an enemy is set to chase. The mode is changed to flee when the player lands on a pill on the board (the mode of each enemy then remains in 'flee' for a set period of time, before reverting to 'chase').

### character behaviour in different modes

The flee/chase modes alter the enemy behaviour:  

*If a player collides with an enemy that has a mode of 'flee', the enemy will disappear from its current position and its position will be re-set to the center of the board (where the enemy will appear a short time later). Such a collision also results in an additional score being awarded to the player.

*If a player collides with an enemy that is in 'chase' mode, a function (endGame) will be called to handle further game play, which could mean moving to a different board or completely ending the game, depending on other conditions (see also below).

*Whether an enemy is in flee or chase mode also alters its movement (see section on Enemy positioning and movement)



## Enemy positioning and movement

### Deciding a direction

Before each enemy makes a move, it will decide which direction to move.  

The Enemy class has a method, decideDirection that is repeatedly called (for each instantiated enemy) at intervals during gameplay. 

The decideDirection method calls other methods (checkRight, checkLeft, checkUp and checkDown) that allow an enemy to determine the coordinates of the cells immediately to the right, left, up and down, around its position. With this information, each enemy can determine whether the cell in question is a passageway (allowing movement), or a wall (dissalowing movement). The enemy also has its own x and y position properties, as well as a method to determine the player's current x-y position on the grid. Using this information, the enemy can determine whether any given cell immediately around it is closer or further from the player's position (in terms of a straight line drawn from enemy to player).

Conditions are also added in decideDirection to avoid enemies back-tracking during their movement. Specifically, enemies have a property (lastMove) that stores information about their previous move. This is then used when deciding which move should be made next.

Before each move, each enemy iterates through directions (right, left, up or down - also taking into acount its last move, as described above), and using a simple sum of x and y grid cell coordinates, along with knowledge of the player's current cell coordinates, sorts the possible moves into an order of desired movement. 

When the enemy is in 'chase' mode, the sorting order results in the first move to try (the most desirable move) being that which will minimise the straight-line distance to the player position. If there are two or more potential moves that offer equal reduction in distance to the player, a random choice is made between these desired moves.

Conversely, when the enemy is in 'flee' mode (after the player has landed on one of the pills on the board), the movement sorting order is reversed: the first move that the enemy will try is the move that will result in the greatest possible increase in straight-line distance from the player's current position.

Now with a desired order of movement, the enemy will assess whether it is possible to move in each direction. The enemy will try (in the order of sorting, as described above) to move in each direction, , until it is able to successfully make a move (until its x-y coordinates change). If for any reason the enemy is unable to find a direction to successfully move in (which may very occassionally be the case if the enemy is in a corner), we simply return out of the method and await a new call to decideDirection.



