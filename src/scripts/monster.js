import GameObject from "./game_object";
import utils from "./utils";
import splashPages from "./splash_pages";
import { Howl, Howler } from 'howler';

class Monster extends GameObject {
  constructor(config) {
    super(config);

    this.prowlDistance = utils.withGrid(6);
    this.distanceFromPlayer = this.prowlDistance;

    this.prowlVolume = 0.1;
    this.currentProwlVolume = this.prowlVolume;

    this.points = 0;
    this.addPoints = 0;

    const distanceVolumes = {
      "utils.withGrid(5)": this.currentProwlVolume = 0.2,
      "utils.withGrid(4)": this.currentProwlVolume = 0.3,
      "utils.withGrid(4)": this.currentProwlVolume = 0.4,
      "utils.withGrid(2)": this.currentProwlVolume = 0.5,
      "utils.withGrid(1)": this.currentProwlVolume = 0.6,
    }
    
    setInterval(() => {
      this.state = "attack"
    }, utils.getRandomInt(8000,12000)
    );

    this.sounds = {
      prowl: new Howl({
        src: ['./src/sounds/prowl_sound.mp3']
      }),
      // attack: new Howl({
      //   src: ['./src/sounds/attack_sound.mp3']
      // }),
      retreat: new Howl({
        src: ['./src/sounds/retreat_sound.mp3']
      })
    }
  }

  prowl() {
    // this.visible = false;
    this.x = this.map.player.x - this.prowlDistance;
    if (!this.sounds.prowl.playing()) {
      this.sounds.prowl.stop();
      this.sounds.prowl.volume(this.prowlVolume);
      this.sounds.prowl.play();
    }
  }

  attack() {
    // this.visible = false;
    if (this.x < this.map.player.x) {
      this.addPoints += 1;
      this.distanceFromPlayer -= 0.25;
      this.x = this.map.player.x - this.distanceFromPlayer;
    }
    if (this.sounds.prowl.playing()) {
      if (this.distanceFromPlayer < utils.withGrid(6) && this.distanceFromPlayer > utils.withGrid(5)) {
        this.currentProwlVolume = 0.1;
        // console.log(this.currentProwlVolume);
      } else if (this.distanceFromPlayer < utils.withGrid(5) && this.distanceFromPlayer > utils.withGrid(4)) {
        this.currentProwlVolume = 0.2;
        // console.log(this.currentProwlVolume);
      } else if (this.distanceFromPlayer < utils.withGrid(4) && this.distanceFromPlayer > utils.withGrid(3)) {
        this.currentProwlVolume = 0.3;
        // console.log(this.currentProwlVolume);
      } else if (this.distanceFromPlayer < utils.withGrid(3) && this.distanceFromPlayer > utils.withGrid(2)) {
        this.currentProwlVolume = 0.4;
        // console.log(this.currentProwlVolume);
      } else if (this.distanceFromPlayer < utils.withGrid(2) && this.distanceFromPlayer > utils.withGrid(1)) {
        this.currentProwlVolume = 0.5;
        // console.log(this.currentProwlVolume);
      }
      this.sounds.prowl.volume(this.currentProwlVolume);
    }
  }

  retreat() {
    // this.visible = true;
    if (this.x > this.map.player.x - this.prowlDistance) {
      this.distanceFromPlayer += 0.5;
      this.x = this.map.player.x - this.distanceFromPlayer;
      if (!this.sounds.retreat.playing()) {
        this.sounds.prowl.stop();
        this.currentProwlVolume = this.prowlVolume;
        this.sounds.retreat.volume(0.5)
        this.sounds.retreat.play();
      }
    } else {
      this.points += this.addPoints;
      this.addPoints = 0;
      console.log(this.points);
      this.state = "prowl"
    }
    
  }

  lose() {
    this.x = this.map.player.x - utils.withGrid(2);
    this.visible = true;
    this.sprite.currentAnimation = "jump-right";
    this.map.monster.sounds.prowl.stop()
  }

  updateState() {
    this.y = this.map.player.y;

    if (this.map.player.direction === "left" && this.state === "attack") {
      this.state = "retreat"
    }
    if (this.x === this.map.player.x) {
      this.sprite.currentAnimation = "attack-right";
    }
    if (this.state === "prowl") this.prowl();
    if (this.state === "attack") this.attack();
    if (this.state === "retreat") this.retreat();
    if (this.state === "lose") this.lose();
  }

  mute(muting) {
    if (muting) {
      console.log("muting");
      this.sounds.prowl.mute(true);
      this.sounds.retreat.mute(true);
    } else {
      console.log("unmuting");
      this.sounds.prowl.mute(false);
      this.sounds.retreat.mute(false);
    }
  }
}

export default Monster;