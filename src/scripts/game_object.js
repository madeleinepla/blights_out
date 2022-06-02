import Sprite from "./sprite";

class GameObject {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;

    this.direction = config.direction;
    this.state = config.state;

    this.sprite = new Sprite(this, config);
    this.spriteNudgeX = config.spriteNudgeX;
    this.spriteNudgeY = config.spriteNudgeY;
    this.spriteDimX = config.spriteDimX;
    this.spriteDimY = config.spriteDimY;

    this.map = config.map;
    this.visible = config.visible;
  }

  update() {

  }
}

export default GameObject;