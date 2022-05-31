import Game from "./scripts/game"
import GameMap from "./scripts/game_map"
import GameObject from "./scripts/game_object"
import Sprite from "./scripts/sprite"
import Player from "./scripts/player"


document.addEventListener("DOMContentLoaded", () => {
  let game = new Game({
    element: document.querySelector(".game-container")
  })

  // const win = document.getElementById('win')
  // win.addEventListener('click', event => {
  //   if (win.style.display === "block") {
  //     window.cancelAnimationFrame(game.requestId);
  //     win.style.display = "none"
  //   }
  // });

  // const lose = document.querySelector('.lose')
  // lose.addEventListener('click', event => {
  //   if (lose.style.display === "block") {
  //     lose.style.display = "none"
  //   }
  // });

  const title = document.getElementById('title')
  title.addEventListener("click", () => {
    
    title.style.opacity = "1.0"

    const fadeTitle = setInterval(() => {
      if (title.style.opacity > "0.0") {
        title.style.opacity -= "0.01";
      } else {
        title.remove();
        clearInterval(fadeTitle);
      }
    }, 5)

    const instructions = document.getElementById('instructions')
    instructions.addEventListener("click", () => {

      instructions.style.opacity = "1.0"

      const fadeInstructions = setInterval(() => {
        if (instructions.style.opacity > "0.0") {
          instructions.style.opacity -= "0.01";
        } else {
          instructions.remove();
          clearInterval(fadeInstructions);
        }
      }, 5)
      game.init();
    })
  })
})