import Game from "./scripts/game"
import GameMap from "./scripts/game_map"
import GameObject from "./scripts/game_object"
import Sprite from "./scripts/sprite"
import Player from "./scripts/player"

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game({
    element: document.querySelector(".game-container")
  })

  game.init();
})