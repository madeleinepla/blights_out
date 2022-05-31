import GameObject from "./game_object";

class Player extends GameObject {
  constructor(config) {
    super(config);
    
    this.heldDirections = [];

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

  startKeyControl() {
    document.addEventListener("keydown", e => {
      const dir = this.keycodes[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1) {
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

  willCollide(direction) {
    const nextMovePlayer = {...this};
    if (direction === "up") {
      nextMovePlayer.y -= 1;
    } else if (direction === "down") {
      nextMovePlayer.y += 1;
    } else if (direction === "left") {
      nextMovePlayer.x -= 1;
    } else if (direction === "right") {
      nextMovePlayer.x += 1;
    }
    
    return this.map.boundaries.some((boundary) => {
      return this.isColliding(nextMovePlayer.x, nextMovePlayer.y, boundary);
    })
  }

  updatePos() {
    const updating = this.heldDirections;

    if (updating.length) {
      this.state = "walk-"

      if (updating.includes("up")) {
        if (!updating.includes("right")) {
          this.direction = "up"
        }

        if (!this.willCollide(this.direction)) {
          this.y -= 1
        }
      }
      if (updating.includes("down")) {
        if (!updating.includes("right")) {
          this.direction = "down"
        }

        if (!this.willCollide(this.direction)) {
          this.y += 1
        }
      }
      if (updating.includes("left")) {
        this.direction = "left"
        
        if (!this.willCollide(this.direction)) {
          this.x -= 1
        }
      }
      if (updating.includes("right")) {
        this.direction = "right"
        
        if (!this.willCollide(this.direction)) {
          this.x += 1
        }
      }
    } else {
      this.state = "idle-"
    }
    this.sprite.updateAnimation(this.state, this.direction);
  }


}

export default Player;