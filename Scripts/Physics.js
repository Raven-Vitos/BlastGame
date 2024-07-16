import { Game } from './GameManager.js'
import { Util } from './Helper.js'

export class Physics {
  constructor(owner, speed) {
    this.owner = owner;
    this.speed = speed;

    this.scene = Game.scene;

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
    this.owner.x = Util.easing(this.owner.x, this.x, this.speed, deltaTime);
    this.owner.y = Util.easing(this.owner.y, this.y, this.speed, deltaTime);
  }
}
