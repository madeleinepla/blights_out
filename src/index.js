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
  const instructions = document.getElementById('instructions')
  title.addEventListener("click", () => {
    title.remove();
    instructions.style.display = "block";
  })
  instructions.addEventListener("click", () => {
    instructions.remove();
    game.init();
  })

  // game.init();
})