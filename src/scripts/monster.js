import GameObject from "./game_object";
import utils from "./utils";
import { Howl, Howler } from 'howler';

class Monster extends GameObject {
  constructor(config) {
    super(config);
    this.prowlDistance = utils.withGrid(6)
    this.distanceFromPlayer = this.prowlDistance;
    this.prowlVolume = 0.1;
    this.currentProwlVolume = this.prowlVolume;
    

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
      }),
      retreat: new Howl({
        src: ['./src/sounds/retreat_sound.mp3']
      })
    }
  }

  prowl() {
    this.visible = false;
    this.x = this.map.player.x - this.prowlDistance;
    if (!this.sounds.prowl.playing()) {
      this.sounds.prowl.stop();
      this.sounds.prowl.volume(this.currentProwlVolume);
      this.sounds.prowl.play();
    }
  }

  attack() {
    this.visible = false;
    if (this.x < this.map.player.x) {
      this.distanceFromPlayer -= 0.25;
      this.x = this.map.player.x - this.distanceFromPlayer;
    }
    if (this.sounds.prowl.playing()) {
      this.currentProwlVolume += 0.02
      this.sounds.prowl.volume(this.currentProwlVolume);
    }
  }

  retreat() {
    this.visible = true;
    if (this.x > this.map.player.x - this.prowlDistance) {
      this.distanceFromPlayer += 0.5;
      this.x = this.map.player.x - this.distanceFromPlayer;
      if (!this.sounds.retreat.playing()) {
        this.sounds.prowl.stop();
        this.currentProwlVolume = this.prowlVolume;
        this.sounds.prowl.volume(this.currentProwlVolume);
        this.sounds.retreat.play();
      }
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