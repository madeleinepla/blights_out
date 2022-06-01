import GameObject from "./game_object";

class Meter extends GameObject {
  constructor(config) {
    super(config);
    this.defaultLevel = 1;
    this.level = this.defaultLevel;
  }

  updateLevel() {
    console.log(this.sprite.currentAnimation)
    this.sprite.currentAnimation = "level-" + this.level;
  }
}

export default Meter;