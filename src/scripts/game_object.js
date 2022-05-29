import Sprite from "./sprite";

class GameObject {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.direction = config.direction;
    this.state = config.state;
    this.sprite = new Sprite(this, config);
    this.map = config.map;
    this.visible = true;
  }



}

export default GameObject;