# Nachtigall, ick hör dir trapsen

<a href="https://hannakayes.github.io/nightingale-vs-skylark/">Have skylark win against nightingale!</a>

## Description
“It was the nightingale, and not the lark” is what Shakespeare wrote in the 16th century – in literature, nightingale and skylark have been contestants for the most beautiful song since humans started writing about them. High time they settle their battle once and for all. Make them sing loud and clear – but beware of noisy objects flying by!

## MVP
- Game starts upon clicking START button
- Skylark jumps up upon pressing ARROW UP
- Skylark moves left upon clicking ARROW LEFT
- Skylark moves right upon clicking ARROW RIGHT
- Objects (boombox, car, plane) are moving downwards, potentially hitting Skylark
- Score to the left shows number of lives, levels, and flying skills

## Backlog
- NIGHTINGALE is singing
- Game is paused upon hitting PAUSE button
- Skylark sings its song when flying / pressing SHIFT key
- Objects (boombox, car, plane, jackhammer) make noises when moving into the frame
- Score shows amount of time in which the SHIFT button has been pressed (reflecting singing and flying)
- Users can enter their name

## Data Structure
### Classes
1. **Game**: Manages game states and transitions.
   - `start_game()`: Initializes the game and starts the main loop.
   - `pause_game()`: Pauses the game.
   - `end_game()`: Ends the game and displays the final score.
2. **Skylark**: Represents the player-controlled character.
   - `jump()`: Makes the skylark jump.
   - `move_left()`: Moves the skylark to the left.
   - `move_right()`: Moves the skylark to the right.
   - `sing()`: Makes the skylark sing.
3. **Obstacle**: Represents obstacles like boombox, car, plane, and jackhammer.
   - `move()`: Moves the obstacle downwards.
   - `make_noise()`: Plays the noise of the obstacle.
4. **Score**: Tracks and displays the player's score.
   - `update_lives()`: Updates the number of lives left.
   - `update_level()`: Updates the current level.
   - `update_flying_skills()`: Updates the flying skills score.
   - `update_singing_time()`: Updates the time spent singing.

## States and State Transitions
### States
1. **Start Screen**: Initial screen with the START button.
2. **Playing**: The main game state where gameplay occurs.
3. **Paused**: Game state when the game is paused.
4. **Game Over**: State when the game ends.

### State Transitions
- From **Start Screen** to **Playing**: Click START button.
- From **Playing** to **Paused**: Click PAUSE button.
- From **Paused** to **Playing**: Click RESUME button.
- From **Playing** to **Game Over**: Skylark loses all lives or hits a critical obstacle.

## Task
1. Implement basic game mechanics (start, pause, end game).
2. Create skylark movement functions.
3. Design and implement obstacle behavior.
4. Develop score tracking and updating mechanisms.
5. Add background music and sound effects for obstacles.
6. Implement singing functionality for Skylark.
7. Add name entry feature for users.
8. Test and debug the game for smooth performance.

## Links
- [GitHub Repo](https://github.com/hannakayes/nightingale-vs-skylark)
- [Project Idea Slides](https://github.com/hannakayes/nightingale-vs-skylark/blob/main/nightingale-vs-skylark.pdf)
- [Trello Board](https://trello.com/b/Ofrs0q56/nightingale-vs-skylark)
- [Deployed game](https://hannakayes.github.io/nightingale-vs-skylark/)
