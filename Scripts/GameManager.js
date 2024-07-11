const Game = {
  scene: undefined,
  sizeH: 5,
  sizeW: 7,

  Start: function () {
    this.scene = new Scene(this.sizeH, this.sizeW);

    for (let h = 0; h < this.sizeH; h++) {
      for (let w = 0; w < this.sizeW; w++) {
        let blockX = w * this.scene.blockWidth * this.scene.blockScale;
        let blockY =
          h * this.scene.blockHeight * this.scene.blockScale -
          h * this.scene.offsetY;

        let blockW = this.scene.blockWidth * this.scene.blockScale;
        let blockH = this.scene.blockHeight * this.scene.blockScale;

        this.scene.addObject(
          new Block(blockX, blockY, w, h, blockW, blockH, getRandomInt(0, 4))
        );
      }
    }
  },

  Tick: function (deltaTime) {},

  MouseClick: function (x, y) {
    const block = this.scene.getObjectByCoord(x, y);

    this.checkRemoveCount(block);

    this.reloadGrid();
  },

  checkRemoveCount: function (block) {
    let block_index = block.index;
    let block_iX = block.ix;
    let block_iY = block.iy;

    let count = 1;

    let block_tpm_left = this.scene.getObjectByIndexes(block_iX - 1, block_iY);
    if (block_tpm_left != undefined && block_tpm_left.index == block_index) {
      count++;
    }

    let block_tpm_right = this.scene.getObjectByIndexes(block_iX + 1, block_iY);
    if (block_tpm_right != undefined && block_tpm_right.index == block_index) {
      count++;
    }

    let block_tpm_top = this.scene.getObjectByIndexes(block_iX, block_iY - 1);
    if (block_tpm_top != undefined && block_tpm_top.index == block_index) {
      count++;
    }

    let block_tpm_bottom = this.scene.getObjectByIndexes(block_iX, block_iY + 1);
    if (block_tpm_bottom != undefined && block_tpm_bottom.index == block_index) {
      count++;
    }

    if (count >= 2) this.removeBlocks(block);
  },

  removeBlocks: function (block) {
    let block_index = block.index;
    let block_iX = block.ix;
    let block_iY = block.iy;

    this.scene.removeObjectByIndex(block_iX, block_iY);

    let block_tpm_left = this.scene.getObjectByIndexes(block_iX - 1, block_iY);
    if (block_tpm_left != undefined && block_tpm_left.index == block_index) {
      this.removeBlocks(block_tpm_left);
    }

    let block_tpm_right = this.scene.getObjectByIndexes(block_iX + 1, block_iY);
    if (block_tpm_right != undefined && block_tpm_right.index == block_index) {
      this.removeBlocks(block_tpm_right);
    }

    let block_tpm_top = this.scene.getObjectByIndexes(block_iX, block_iY - 1);
    if (block_tpm_top != undefined && block_tpm_top.index == block_index) {
      this.removeBlocks(block_tpm_top);
    }

    let block_tpm_bottom = this.scene.getObjectByIndexes(
      block_iX,
      block_iY + 1
    );
    if (
      block_tpm_bottom != undefined &&
      block_tpm_bottom.index == block_index
    ) {
      this.removeBlocks(block_tpm_bottom);
    }
  },

  reloadGrid: function () {
    for (let w = 0; w < this.scene.width; w++) {
      let need_block_index = -1;

      for (let h = this.scene.height - 1; h > 0; h--) {

        const empty_block = this.scene.sceneObjects[h][w];
        if (empty_block == undefined) {
          need_block_index = h - 1;
          let ky = 1;
          for (let i = need_block_index; i >= 0; i--) {
            const block = this.scene.sceneObjects[i][w];
            if (block) {              
              this.scene.sceneObjects[block.iy][block.ix] = undefined
              block.iy += ky;
              this.scene.sceneObjects[block.iy][block.ix] = block
            }
            else
            {
                ky++;
            }
          }
        }

      }

    }
    
    for (let w = 0; w < this.scene.width; w++) {
        for (let h = 0; h < this.scene.height; h++) {
            const block = this.scene.sceneObjects[h][w];
            if (block) block.physics.updateData()
        }
    }

  },
};
