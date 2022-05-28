import GameObject from "./game_object";
import utils from "./utils";

class Monster extends GameObject {
  constructor(config) {
    super(config);
    this.prowlDistance = utils.withGrid(6)
    this.distanceFromPlayer = this.prowlDistance;

    setInterval(() => {
      this.state = "attack"
    }, 5000);
  }

  prowl() {
    // console.log("prowl")
    this.x = this.map.player.x - this.prowlDistance;
  }

  attack() {
    // console.log("attack")
    if (this.x < this.map.player.x) {
      this.distanceFromPlayer -= 0.5;
      this.x = this.map.player.x - this.distanceFromPlayer;
    }
  }

  retreat() {
    // console.log("retreat")
    if (this.x > this.map.player.x - this.prowlDistance) {
      this.distanceFromPlayer += 0.5;
      this.x = this.map.player.x - this.distanceFromPlayer;
    } else {
      this.state = "prowl"
    }
    
  }

  updateState() {
    if (this.map.player.direction === "left" && this.state === "attack") {
      this.state = "retreat"
    }
    if (this.x === this.map.player.x) {
      this.currentAnimation = "attack-right"
    }
    if (this.state === "prowl") this.prowl();
    if (this.state === "attack") this.attack();
    if (this.state === "retreat") this.retreat();
  }

  
}

export default Monster;