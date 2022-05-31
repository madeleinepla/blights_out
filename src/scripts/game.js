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
    this.requestId;
    this.readyStart = false;
    this.isGameOver = false;

    const music = new Howl({
      src: ['./src/sounds/music.mp3']
    });
    
    music.play();

    const button = document.querySelector('.mute-btn');
    button.addEventListener('click', event => {
      console.log(event.target) // button#mute-btn
      if (music.playing()) {
        music.pause();
        this.map.monster.mute(true);
      } else {
        music.play();
        this.map.monster.mute(false);
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

      this.map.meter.draw(this.ctx);

      if (this.readyStart) {
        if (!this.isGameOver) {
          this.requestId = requestAnimationFrame(() => {
            step();
          })
        }
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
        ready.querySelector("h1").innerHTML = "3";

        setTimeout(() => {
          ready.querySelector("h1").innerHTML = "2";

          setTimeout(() => {
            ready.querySelector("h1").innerHTML = "1";

            setTimeout(() => {
              ready.querySelector("h1").innerHTML = "Don't die";

              setTimeout(() => {
                ready.remove();
                this.readyStart = true;
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
      // this.isGameOver = true;
      this.map.player.movable = false;
      this.map.monster.state = "lose";
      setTimeout(() => {
        splashPages.winPage();
      }, 3000)
    } else if (outcome === "lose") {
      this.map.player.movable = false;
      if (!this.map.monster.sounds.retreat.playing()) {
        this.map.monster.sounds.retreat.play()
      }
      setTimeout(() => {
        splashPages.losePage();
      }, 3000)
      
    }
  }
}

export default Game;