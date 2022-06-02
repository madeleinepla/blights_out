import GameObject from "./game_object";

class Player extends GameObject {
  constructor(config) {
    super(config);
    
    this.heldDirections = [];
    this.movable = true;

    this.keycodes = {
      "ArrowUp": "up",
      "KeyW": "up",
      "ArrowDown": "down",
      "KeyS": "down",
      "ArrowLeft": "left",
      "KeyA": "left",
      "ArrowRight": "right",
      "KeyD": "right"
    }

    this.startKeyControl();
  }

  keyDown(e) {
    const dir = this.keycodes[e.code];
    if (dir && this.heldDirections.indexOf(dir) === -1) {
      this.heldDirections.unshift(dir);
    }
  }

  startKeyControl() {
    document.addEventListener("keydown", e => {
      const dir = this.keycodes[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1 && this.movable) {
        this.heldDirections.unshift(dir);
      }
    });
    document.addEventListener("keyup", e => {
      const dir = this.keycodes[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    })
  }

  isColliding(x, y, boundary) {
    if (
      //right collision
      x + 16 >= boundary.x &&
      //left collision
      x <= boundary.x + boundary.width &&
      //bottom collision
      y + 16 >= boundary.y &&
      //top collision
      y <= boundary.y + (boundary.height / 2)

    ) {
      return true;
    } else {
      return false
    }
  }

  getValidMovement(directions) {
    const validMovement = {x: 0, y: 0};

    if (!this.map.boundaries.some((boundary) => {
      return this.isColliding(this.x + directions.x, this.y, boundary);
    })) {
      validMovement.x += directions.x;
    }

    if (!this.map.boundaries.some((boundary) => {
      return this.isColliding(this.x, this.y + directions.y, boundary);
    })) {
      validMovement.y += directions.y;
    }

    return validMovement;
  }

  update() {
    const updating = this.heldDirections;
    let nextPos = {
      x: 0,
      y: 0
    }

    if (updating.length) {
      this.state = "walk-"

      if (updating.includes("up")) {
        if (!updating.includes("right")) {
          this.direction = "up"
        }

        nextPos.y -= 1;
      }
      if (updating.includes("down")) {
        if (!updating.includes("right")) {
          this.direction = "down"
        }

        nextPos.y += 1;
      }
      if (updating.includes("left")) {
        this.direction = "left"

        nextPos.x -= 1
      }
      if (updating.includes("right")) {
        this.direction = "right"

        nextPos.x += 1
      }

      const validMovement = this.getValidMovement(nextPos)

      this.x += validMovement.x;
      this.y += validMovement.y;

    } else {
      this.state = "idle-"
    }

    this.sprite.updateAnimation(this.state, this.direction);
  }
}

export default Player;