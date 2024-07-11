class Physics {
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
    this.owner.x = this.easing(this.owner.x, this.x, this.speed, deltaTime);
    this.owner.y = this.easing(this.owner.y, this.y, this.speed, deltaTime);
  }

  easing(start_x, end_x, speed, deltaTime) {
    let x = (end_x - start_x) / speed * deltaTime
    return start_x + x;
  }
}
