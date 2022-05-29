import GameObject from "./game_object";
import utils from "./utils";
import { Howl, Howler } from 'howler';

class Monster extends GameObject {
  constructor(config) {
    super(config);
    this.prowlDistance = utils.withGrid(6)
    this.distanceFromPlayer = this.prowlDistance;
    

    setInterval(() => {
      this.state = "attack"
    }, utils.getRandomInt(8000,12000)
    );

    this.sounds = {
      prowl: new Howl({
        src: ['./src/sounds/prowl_sound.mp3']
      }),
      attack: new Howl({
        src: ['./src/sounds/attack_sound.mp3']
      })
    }
  }

  prowl() {
    // this.visible = false;
    this.x = this.map.player.x - this.prowlDistance;
    if (!this.sounds.prowl.playing()) {
      this.sounds.prowl.stop();
      this.sounds.prowl.volume(0.3);
      this.sounds.attack.stop();
      this.sounds.prowl.play();
    }
  }

  attack() {
    // this.visible = false;
    if (this.x < this.map.player.x) {
      this.distanceFromPlayer -= 0.10;
      this.x = this.map.player.x - this.distanceFromPlayer;
    }
    if (!this.sounds.attack.playing()) {
      this.sounds.attack.volume(0.3);
      this.sounds.prowl.stop();
      this.sounds.attack.play();
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