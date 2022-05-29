import GameObject from "./game_object";
import Player from "./player";
import Monster from "./monster";
import utils from "./utils";

class GameMap {
  constructor() {
    this.map = this;
    this.background = new Image();
    this.background.src = "./src/images/maps/blights_out_tilemap.png";

    this.light_right = new Image();
    this.light_right.src = "./src/images/characters/light_right.png";
    this.light_left = new Image();
    this.light_left.src = "./src/images/characters/light_left.png";
    this.light_up = new Image();
    this.light_up.src = "./src/images/characters/light_up.png";
    this.light_down = new Image();
    this.light_down.src = "./src/images/characters/light_down.png";

    this.light = this.light_right;

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

  drawLight(ctx) {
    if(this.player.direction === "right") {
      this.light = this.light_right;
    } else if (this.player.direction === "left") {
      this.light = this.light_left;
    } else if (this.player.direction === "up") {
      this.light = this.light_up;
    } else if (this.player.direction === "down") {
      this.light = this.light_down;
    } 
    ctx.drawImage(this.light, 0, 0);
  }


  
}

export default GameMap;