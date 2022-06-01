import GameMap from "./game_map";
import splashPages from "./splash_pages";
import utils from "./utils"
import { Howl, Howler } from 'howler';


class Game {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = new GameMap();
    this.readyStart = false;

    const music = new Howl({
      src: ['./src/sounds/music.mp3']
    });
    
    music.play();

    const button = document.querySelector('.mute-btn');
    button.addEventListener('click', event => {
      if (music.playing()) {
        music.pause();
        this.map.monster.mute(true);
        this.map.meter.visible = true;
        document.querySelector('.mute-btn').innerText = "silent mode: on";
      } else {
        music.play();
        this.map.monster.mute(false);
        this.map.meter.visible = false;
        document.querySelector('.mute-btn').innerText = "silent mode: off";
      }

    });
  }

  startGameloop() {
    const step = () => {

      if (this.map.player.isColliding(this.map.player.x, this.map.player.y, this.map.finishLine)) {
        this.gameOver("win");
      }
      if (this.map.monster.x === this.map.player.x) {
        this.gameOver("lose");
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.map.drawBoundaries(this.ctx, this.map.player);
      
      this.map.drawFinishLine(this.ctx, this.map.player);
      
      this.map.drawBackground(this.ctx, this.map.player);

      this.map.monster.updateState();
      this.map.monster.sprite.updateAnimationProgress();
      this.map.monster.sprite.draw(this.ctx, this.map.player);

      this.map.player.updatePos();
      this.map.player.sprite.updateAnimationProgress();
      this.map.player.sprite.draw(this.ctx, this.map.player);

      this.map.drawLight(this.ctx);

      this.map.meter.updateLevel();
      this.map.meter.sprite.updateAnimationProgress();
      this.map.meter.sprite.drawMeter(this.ctx);

      if (this.readyStart) {
        requestAnimationFrame(() => {
          step();
        })
      } else {
        this.readySetGo();
      }
    }

    step();
  }

  init() {
    this.startGameloop();
  }

  readySetGo() {
    const ready = document.getElementById("ready")
    
    setTimeout(() => {
      ready.style.display = "block";

      setTimeout(() => {
        ready.querySelector("h2").innerHTML = "3";

        setTimeout(() => {
          ready.querySelector("h2").innerHTML = "2";

          setTimeout(() => {
            ready.querySelector("h2").innerHTML = "1";

            setTimeout(() => {
              ready.querySelector("h2").innerHTML = "";
              ready.querySelector("h3").innerHTML = "don't die";

              setTimeout(() => {
                ready.remove();
                this.readyStart = true;
                this.map.monster.waitToAttack();
                this.startGameloop();
              }, 1000)
            }, 1000)
          }, 1000)
        }, 1000)
      }, 1000)
    }, 500)
    

  }

  gameOver(outcome) {
    if (outcome === "win") {
      this.map.player.movable = false;
      this.map.player.heldDirections = [];
      this.map.monster.state = "lose";
      document.getElementById("score").innerHTML = "big boy points: " + this.map.monster.points;

      setTimeout(() => {
        splashPages.winPage();
      }, 3000)
    } else if (outcome === "lose") {
      this.map.player.movable = false;
      this.map.player.heldDirections = [];
      this.map.monster.state = "win";

      setTimeout(() => {
        splashPages.losePage();
      }, 3000)
      
    }
  }
}

export default Game;