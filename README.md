Background:

Blights Out is a 2d top down game where you play an altered version of 
‘red light, green light’. The player controls a little kid walking down 
a long hallway at night to get to their parents’ room with a monster following 
behind them. When the player hears the monster drawing near they have to turn 
around and look at the monster to make it retreat. The player wins if they 
make it to the parents’ room within a time constraint. 

---------------------------------------------------------------

Functionality & MVPs:

In Blights Out, users will be able to:

- traverse a dark hallway as the player
- listen for a monster drawing near behind them
- ward of the monster by turning around and shining a light on it
- win the game by reaching the safety of their parents' room


In addition, this project will include:

- an opening screen to access 'start game', 'instructions', 'settings'
- an accessibilty option where a noise meter appears next to the game screen so
  the game can still be played with no sound

---------------------------------------------------------------

Wireframes: 

---------------------------------------------------------------

Technologies, Libraries, APIs:

This project will use:
- Canvas API to render visual elements
- Howler.js for sound control and music
- Webpack and Babel to bundle and transpile the source JavaScript code
- npm to manage project dependencies

---------------------------------------------------------------

Implementation Timeline:

Friday: 
  Get images on the screen, implement moving mechanicas for both player
  and monster
Weekend: 
  Set up game timer and monster mechanic of approaching player and 
  retreating in response to the player
Monday:
  Add lighting so that player can only see where their flashlight shines,
  make monster invisible unless light being shown on it
Tuesday: 
  Add and sync up sounds and noise meter
Wednesday:
  Create title screen and settings menu, ability to mute sound
Thursday:
  Catch up on everything I wasn't able to get done

---------------------------------------------------------------

Bonus features:

In the future, I would like to add:
- Cut scenes at the beginning and end of of game to give it more of a narrative
- Additional difficulty levels, possibly include avoiding obsticles