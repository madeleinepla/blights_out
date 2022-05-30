import GameObject from "./game_object";

class Player extends GameObject {
  constructor(config) {
    super(config);
    
    this.heldDirections = [];
    this.map = {
      "ArrowUp": "up",
      "KeyW": "up",
      "ArrowDown": "down",
      "KeyS": "down",
      "ArrowLeft": "left",
      "KeyA": "left",
      "ArrowRight": "right",
      "KeyD": "right"
    }
    this.directionUpdate = {
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1],
    }
    this.startKeyControl();
  }

  startKeyControl() {
    document.addEventListener("keydown", e => {
      const dir = this.map[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
    });
    document.addEventListener("keyup", e => {
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    })
  }

  updatePos() {
    // const updating = this.directionUpdate[this.heldDirections]
    // if (updating) {
    //   this.state = "walk-"
    //   const property = updating[0];
    //   const change = updating[1];

    //   if (property === "x") {
    //     this.x += change;
    //     if (change > 0) {
    //       this.direction = "right"
    //     } else if (change < 0) {
    //       this.direction = "left"
    //     } 
    //   } else {
    //     this.y += change
    //     if (change > 0) {
    //       this.direction = "down"
    //     } else if (change < 0) {
    //       this.direction = "up"
    //     }
    //   }
    // } else {
    //   this.state = "idle-"
    // }

    const updating = this.heldDirections
    if (updating.length) {
      this.state = "walk-"
      console.log(updating)
      
      if (updating.includes("up")) {
        if (!updating.includes("right")) {
          this.direction = "up"
        }
        this.y -= 1
      } else if (updating.includes("down")) {
        if (!updating.includes("right")) {
          this.direction = "down"
        }
        this.y += 1
      } else if (updating.includes("left")) {
        this.direction = "left"
        this.x -= 1
      } else if (updating.includes("right")) {
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