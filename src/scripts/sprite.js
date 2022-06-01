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
    const x = this.gameObject.x - this.gameObject.spriteNudgeX + utils.withGrid(7) - player.x;
    const y = this.gameObject.y - this.gameObject.spriteNudgeY + utils.withGrid(4.5) - player.y;

    const currentAnimationFrameX = this.animations[this.currentAnimation][this.currentAnimationFrame][0] * this.gameObject.spriteDimX;
    const currentAnimationFrameY = this.animations[this.currentAnimation][this.currentAnimationFrame][1] * this.gameObject.spriteDimY;

    if (this.isLoaded && this.gameObject.visible) {
      ctx.drawImage(
        this.image,
        currentAnimationFrameX,
        currentAnimationFrameY,
        this.gameObject.spriteDimX, this.gameObject.spriteDimY,
        x, y,
        this.gameObject.spriteDimX, this.gameObject.spriteDimY
      );
    }
  }

  drawMeter(ctx) {
    console.log("called")
    const x = this.gameObject.x;
    const y = this.gameObject.y;

    const currentAnimationFrameX = this.animations[this.currentAnimation][this.currentAnimationFrame][0] * this.gameObject.spriteDimX;
    const currentAnimationFrameY = this.animations[this.currentAnimation][this.currentAnimationFrame][1] * this.gameObject.spriteDimY;

    if (this.gameObject.visible) {
      ctx.drawImage(
        this.image,
        currentAnimationFrameX,
        currentAnimationFrameY,
        this.gameObject.spriteDimX, this.gameObject.spriteDimY,
        x, y,
        this.gameObject.spriteDimX, this.gameObject.spriteDimY
      );
    }
  }

}

export default Sprite;