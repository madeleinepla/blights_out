import GameObject from "./game_object";
import Player from "./player";
import Monster from "./monster";
import utils from "./utils";
import collisions from "./collisions";
import boundary from "./boundary";
import Boundary from "./boundary";
import Meter from "./meter";


class GameMap {
  constructor() {
    this.map = this;

    this.background = new Image();
    this.background.src = "./src/images/maps/hallway_map2.png";

    this.collisionsMap = [];
    this.boundaries = [];
    this.setCollisionMap();

    this.finishLine = new Boundary([utils.withGrid(237), utils.withGrid(10)]);
    this.finishLine.width = 16;
    this.finishLine.height = 48;

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
      y: utils.withGrid(5),
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
      map: this.map,
      spriteNudgeX: 8,
      spriteNudgeY: 14,
      spriteDim: 32,
      visible: true
    });

    this.monster = new Monster({
      x: this.player.x - utils.withGrid(6),
      y: this.player.y,
      src: "./src/images/monsters/monster4_fix.png",
      animations: {
        "walk-right": [
          [0, 1], [1, 1], [2, 1], [3, 1]
        ],
        "attack-right": [
          [0, 0], [1, 0], [2, 0], [3, 0]
        ],
        "jump-right": [
          [0, 2], [1, 2], [2, 2], [3, 2]
        ]
      },
      currentAnimation: "walk-right",
      map: this.map,
      state: "prowl",
      spriteNudgeX: 46,
      spriteNudgeY: 46,
      spriteDim: 64,
      visible: false
    })

    this.meter = new Meter({
      x: utils.withGrid(0.5),
      y: utils.withGrid(8.5),
      src: "./src/images/maps/temp_meter.png",
      animations: {

      },
      currentAnimation: "something",
      map: this.map,
      state: "idk",
      spriteNudgeX: 0,
      spriteNudgeY: 0,
      spriteDim: 80,
      visible: false
    })
  }

  setCollisionMap() {
    for (let i = 0; i < collisions.length; i+= 240) {
      this.collisionsMap.push(collisions.slice(i, i + 240))
    }

    this.collisionsMap.forEach((row, i) => {
      row.forEach((ele, j) => {
        if (ele === 233) {
          this.boundaries.push(new Boundary([j * 16, i * 16]))
        }
      })
    })
  }

  drawBoundaries(ctx, player) {
    this.boundaries.forEach((boundary) => {
      const x = boundary.x + utils.withGrid(7) - player.x;
      const y = boundary.y + utils.withGrid(4.5) - player.y;
  
      ctx.fillStyle = 'red, 0';
      ctx.fillRect(x, y, boundary.width, boundary.height);
    })
  }

  drawFinishLine(ctx, player) {
    const x = this.finishLine.x + utils.withGrid(7) - player.x;
    const y = this.finishLine.y + utils.withGrid(4.5) - player.y;

    ctx.fillStyle = 'green, 0';
    ctx.fillRect(x, y, this.finishLine.width, this.finishLine.height);
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

  drawMeter(ctx) {
    if (this.meter.visible) {
      ctx.drawImage(this.meter.sprite.image, this.meter.x, this.meter.y);
    }
  }


  
}

export default GameMap;