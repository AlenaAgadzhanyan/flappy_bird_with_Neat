import { loadImage } from './utils.js';

export class Bird {
  static birdImg;
  width = 66;
  height = 47;
  hitboxWidth = 55;
  hitboxHeight = 35;
  flapPower = 4;
  gravity = 0.15;

  static async preloadImage() {
    Bird.birdImg = new Image();
    await loadImage(Bird.birdImg, './assets/bird.png');
  }

  constructor(canvas,genome) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = canvas.width / 10;   // middle of the bird
    this.y = canvas.height / 4;   // middle of the bird
    this.velocity = 0;
    this.isAlive = true;
    this.genome = genome;
    this.genome.score = 0;
  }

  draw() {
    this.ctx.drawImage(
      Bird.birdImg,
      this.x - this.width / 2,
      this.y - this.height / 2,
    );
  }

  flap() {
    this.velocity = -this.flapPower;
  }

  update(closesPipe) {
    this.genome.score++;
    if (closesPipe) {
      const inputs = [
        this.y / this.canvas.height,
        this.velocity / 10,
        closesPipe.top / this.canvas.height,
        closesPipe.x / this.canvas.width,
      ];
      const [output] = this.genome.activate(inputs);
      if (output > 0.5) this.flap();

    }

    this.velocity += this.gravity;
    this.y += this.velocity;

    this.draw();
  }
}