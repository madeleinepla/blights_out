import GameMap from "./game_map";
import { Howl, Howler } from 'howler';


class Game {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = new GameMap();

    setTimeout(() => {
      const music = new Howl({
        src: ['./src/sounds/music.mp3']
      });
      music.play();
    }, 3000)
  }

  startGameloop() {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.map.drawBackground(this.ctx, this.map.player);
      this.map.player.updatePos();
      this.map.player.sprite.draw(this.ctx, this.map.player);
      this.map.player.sprite.updateAnimationProgress();
      // this.map.monster.updateState();
      // this.map.monster.sprite.draw(this.ctx, this.map.player);
      // this.map.monster2.updateState();
      this.map.monster2.sprite.drawMonster(this.ctx, this.map.player);
      this.map.monster2.sprite.updateAnimationProgress();
      // this.map.monster.sprite.updateAnimationProgress();
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