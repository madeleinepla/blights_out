import GameObject from "./game_object";
import Player from "./player";
import Monster from "./monster";
import utils from "./utils";

class GameMap {
  constructor() {
    this.map = this;
    this.background = new Image();
    this.background.src = "./src/images/maps/blights_out_tilemap.png";

    this.light = new Image();
    this.light.src = "./src/images/characters/light.png";

    this.player = new Player({
      x: utils.withGrid(7),
      y: utils.withGrid(4),
      src: "./src/images/characters/npc3_alter.png",
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
      direction: "right",
      map: this.map
    });

    this.monster = new Monster({
      x: this.player.x - utils.withGrid(6),
      y: utils.withGrid(4),
      src: "./src/images/monsters/monster1.png",
      animations: {
        "idle-right": [
          [0, 0], [1, 0], [2, 0], [3, 0]
        ], 
        "attack-right": [
          [0, 1], [1, 1], [2, 1], [3, 1]
        ]
      },
      currentAnimation: "idle-right",
      map: this.map,
      state: "prowl"
    });

    
  }

  drawBackground(ctx, player) {
    const x = utils.withGrid(7) - player.x;
    const y = utils.withGrid(4.5) - player.y;

    ctx.drawImage(this.background, x, y);
  }


  
}

export default GameMap;