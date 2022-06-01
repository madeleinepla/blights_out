import GameObject from "./game_object";

class Meter extends GameObject {
  constructor(config) {
    super(config);
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, 80, 16);
  }
}

export default Meter;