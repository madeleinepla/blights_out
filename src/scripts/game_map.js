import GameObject from "./game_object";
import Player from "./player";
import utils from "./utils";

class GameMap {
  constructor() {
    this.background = new Image();
    this.background.src = "./src/images/maps/hallway_map.png"

    this.player = new Player({
      x: utils.withGrid(7),
      y: utils.withGrid(4),
      src: "./src/images/characters/npc3.png",
      animations: {
        "idle-down": [
          [0, 0]
        ],
        "idle-right": [
          [0, 1]
        ],
        "idle-up": [
          [0, 2]
        ],
        "idle-left": [
          [0, 3]
        ],
        "walk-down": [
          [0, 0], [1, 0], [2, 0], [3, 0]
        ],
        "walk-right": [
          [0, 1], [1, 1], [2, 1], [3, 1]
        ],
        "walk-up": [
          [0, 2], [1, 2], [2, 2], [3, 2]
        ],
        "walk-left": [
          [0, 3], [1, 3], [2, 3], [3, 3]
        ],
      },
      currentAnimation: "idle-right",
      state: "idle-",
      direction: "right"
    });

    this.monster = new GameObject({
      x: utils.withGrid(3),
      y: utils.withGrid(4),
      src: "./src/images/monsters/monster1.png",
      animations: {
        "idle-right": [
          [0, 0], [1, 0], [2, 0], [3, 0]
        ]
      },
      currentAnimation: "idle-right"
    });
  }

  drawBackground(ctx) {
    ctx.drawImage(this.background, 0, 0);
  }

  
}

export default GameMap;