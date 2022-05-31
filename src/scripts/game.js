import GameMap from "./game_map";
import splashPages from "./splash_pages";
import { Howl, Howler } from 'howler';


class Game {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = new GameMap();
    this.requestId;
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
      // if (this.map.player.isColliding(this.map.player.x, this.map.player.y, this.map.finishLine)) {
      //   splashPages.winPage();
      // }

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

      this.map.player.updatePos();
      this.map.player.sprite.updateAnimationProgress();
      this.map.player.sprite.draw(this.ctx, this.map.player);

      this.map.monster.updateState();
      this.map.monster.sprite.updateAnimationProgress();
      this.map.monster.sprite.draw(this.ctx, this.map.player);

      this.map.drawLight(this.ctx);
      
      if (!this.isGameOver) {
        this.requestId = requestAnimationFrame(() => {
          step();
        })
      }
    }

    step();
  }

  init() {
    this.startGameloop();
  }

  gameOver(outcome) {
    this.isGameOver = true;
    
    if (outcome === "win") {
      splashPages.winPage();
    } else if (outcome === "lose") {
      splashPages.losePage();
    }
  }
}

export default Game;