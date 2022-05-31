import GameMap from "./game_map";
import { Howl, Howler } from 'howler';


class Game {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = new GameMap();

    const music = new Howl({
      src: ['./src/sounds/music.mp3']
    });
    
    music.play();

    const button = document.querySelector('.mute-btn');
    button.addEventListener('click', event => {
      console.log(event.target) // button#mute-btn
      if (music.playing()) {
        music.pause();
      } else {
        music.play();
      }

    });
  }

  startGameloop() {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.map.drawBackground(this.ctx, this.map.player);

      this.map.drawBoundaries(this.ctx, this.map.player);

      this.map.player.updatePos();
      this.map.player.sprite.updateAnimationProgress();
      this.map.player.sprite.draw(this.ctx, this.map.player);

      this.map.monster.updateState();
      this.map.monster.sprite.updateAnimationProgress();
      this.map.monster.sprite.draw(this.ctx, this.map.player);

      this.map.drawLight(this.ctx);
      
      requestAnimationFrame(() => {
        step();
      })
    }

    step();
  }

  init() {
    this.startGameloop();
  }
}

export default Game;