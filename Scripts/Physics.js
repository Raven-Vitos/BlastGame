import { GameManager } from './GameManager.js'
import { Helper } from './Helper.js'

export class Physics {
  constructor(owner, speed) {
    this.owner = owner;
    this.speed = speed;

    this.scene = GameManager.scene;

    this.setCoord(this.owner.x, this.owner.y)
  }

  setCoord(x, y) {
    this.x = x;
    this.y = y;
  }

  updateData() {
    let coords = this.scene.convertIndexesToCoord(this.owner.ix, this.owner.iy)
    this.setCoord(coords.x, coords.y);
  }

  update(deltaTime) {
    this.owner.x = Helper.easing(this.owner.x, this.x, this.speed, deltaTime);
    this.owner.y = Helper.easing(this.owner.y, this.y, this.speed, deltaTime);
  }
}
