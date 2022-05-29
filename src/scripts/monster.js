import GameObject from "./game_object";
import utils from "./utils";

class Monster extends GameObject {
  constructor(config) {
    super(config);
    this.prowlDistance = utils.withGrid(6)
    this.distanceFromPlayer = this.prowlDistance;
    

    setInterval(() => {
      this.state = "attack"
    }, utils.getRandomInt(3000,8000)
    );
  }

  prowl() {
    // this.visible = false;
    this.x = this.map.player.x - this.prowlDistance;
  }

  attack() {
    // this.visible = false;
    if (this.x < this.map.player.x) {
      this.distanceFromPlayer -= 0.5;
      this.x = this.map.player.x - this.distanceFromPlayer;
    }
  }

  retreat() {
    // this.visible = true;
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