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

  updatePos() {
    const updating = this.heldDirections;

    if (updating.length) {
      this.state = "walk-"
      
      if (updating.includes("up")) {
        if (!updating.includes("right")) {
          this.direction = "up"
        }
        this.y -= 1
      }
      if (updating.includes("down")) {
        if (!updating.includes("right")) {
          this.direction = "down"
        }
        this.y += 1
      }
      if (updating.includes("left")) {
        this.direction = "left"
        this.x -= 1
      }
      if (updating.includes("right")) {
        this.direction = "right"
        this.x += 1
      } 
    } else {
      this.state = "idle-"
    }
    this.sprite.updateAnimation(this.state, this.direction);
  }
}

export default Player;