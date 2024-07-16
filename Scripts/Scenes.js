export class Scene {
  LoadedImages() {
    this.images = [];

    let image = new Image();
    image.src = "Assets/Images/Blocks/Blue.png";
    this.images.push(image);

    image = new Image();
    image.src = "Assets/Images/Blocks/Green.png";
    this.images.push(image);

    image = new Image();
    image.src = "Assets/Images/Blocks/Purple.png";
    this.images.push(image);

    image = new Image();
    image.src = "Assets/Images/Blocks/Red.png";
    this.images.push(image);

    image = new Image();
    image.src = "Assets/Images/Blocks/Yellow.png";
    this.images.push(image);

    image = new Image();
    image.src = "Assets/Images/Blocks/super.png";
    this.images.push(image);
  }

  LoadBlockSettings() {
    this.blockScale = 0.5;
    this.blockHeight = 192;
    this.blockWidth = 171;
    this.offsetY = (this.blockHeight - this.blockWidth) * this.blockScale;    
  }

  constructor(height, width) {
    this.LoadedImages();
    this.LoadBlockSettings();

    this.sceneObjects = [];

    this.height = height;
    this.width = width;

    for (let h = 0; h < height; h++) {
      let row = [];
      for (let w = 0; w < width; w++) {
        row.push(undefined);
      }

      this.sceneObjects.push(row);
    }

    this.canvas = document.getElementById("viewport");
    this.canvas.width = width * this.blockWidth * this.blockScale;
    this.canvas.height = height * this.blockWidth * this.blockScale + this.offsetY;

    this.viewport = this.canvas.getContext("2d");
  }

  removeObject(x, y) {
    let indexes = this.convertCoordToIndexes(x, y)
    this.removeObjectByIndex(indexes.x, indexes.y)
  }

  removeObjectByIndex(x, y) {
    if (x >= this.width || x < 0 || y >= this.height || y < 0) return;

    delete this.sceneObjects[y][x]
    this.sceneObjects[y][x] = undefined
  }

  addObject(block) {
    this.sceneObjects[block.iy][block.ix] = block;
  }

  getObjectByIndexes(x, y) {
    if (x >= this.width || x < 0 || y >= this.height || y < 0) return undefined;

    return this.sceneObjects[y][x]
  }

  getObjectByCoord(x, y) {
    let indexes = this.convertCoordToIndexes(x, y)
    return this.getObjectByIndexes(indexes.x, indexes.y)
  }

  convertCoordToIndexes(x, y) {
    let indexX = -1
    let indexY = -1

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        const block = this.sceneObjects[h][w];
        if (block.x <= x && block.x + block.w >= x && 
            block.y <= y && block.y + block.h >= y) {
          indexX = block.ix
          indexY = block.iy

          return {x: indexX, y: indexY}
        }
      }
    }

    return {x: indexX, y: indexY}
  }

  convertIndexesToCoord(ix, iy) {
    let cx = ix * this.blockWidth * this.blockScale;
    let cy = iy * this.blockHeight * this.blockScale - iy * this.offsetY;

    return {x: cx, y: cy}
  }

  render(deltaTime) {   
    this.viewport.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.viewport.globalCompositeOperation = "destination-over";

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        const block = this.sceneObjects[h][w];
        if (!block) continue;

        block.physics.update(deltaTime)

        this.viewport.drawImage(
          this.images[block.index],
          block.x,
          block.y,
          block.w,
          block.h
        );
      }
    }
  }
}
