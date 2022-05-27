import utils from "./utils";

class Sprite {
  constructor(gameObject, config) {
    this.gameObject = gameObject; 
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    this.animations = config.animations;
    this.currentAnimation = config.currentAnimation;
    this.currentAnimationFrame = 0;
    //speed of animation
    this.animationFrameLimit = 16;
    this.animationFrameProgress = this.currentAnimationFrameLimit;
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1

    if (this.currentAnimationFrame === this.animations[this.currentAnimation].length) {
      this.currentAnimationFrame = 0;
    }
  }

  updateAnimation(direction, state) {
    if (this.currentAnimation !== direction + state) {
      this.currentAnimationFrame = 0;
      this.currentAnimation = direction + state;
    }
  }

  draw(ctx, player) {
    const x = this.gameObject.x - 8 + utils.withGrid(7) - player.x;
    const y = this.gameObject.y - 14 + utils.withGrid(4.5) - player.y;
    if (this.isLoaded) {
      ctx.drawImage(
      this.image,
      this.animations[this.currentAnimation][this.currentAnimationFrame][0] * 32,
      this.animations[this.currentAnimation][this.currentAnimationFrame][1] * 32,
      32, 32,
      x, y,
      32, 32
    );
    }
  }

}

export default Sprite;