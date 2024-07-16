import { Block } from './Blocks.js'
import { UI } from './UI.js'
import { Scene } from './Scenes.js'
import { Util } from './Helper.js'

export const Game = {
  scene: undefined,
  sizeH: 6,
  sizeW: 5,

  Start: function () {
    this.scene = new Scene(this.sizeH, this.sizeW);
    UI.init(5, 30)

    for (let h = 0; h < this.sizeH; h++) {
      for (let w = 0; w < this.sizeW; w++) {
        let blockX = w * this.scene.blockWidth * this.scene.blockScale;
        let blockY =
          h * this.scene.blockHeight * this.scene.blockScale -
          h * this.scene.offsetY;

        let blockW = this.scene.blockWidth * this.scene.blockScale;
        let blockH = this.scene.blockHeight * this.scene.blockScale;

        this.scene.addObject(
          new Block(blockX, blockY, w, h, blockW, blockH, Util.getRandomInt(0, 4))
        );
      }
    }
  },

  Tick: function (deltaTime) {},

  MouseClick: function (x, y) {
    if (!UI.getStep()) {        
        return;
    }

    const block = this.scene.getObjectByCoord(x, y);

    if (block.index == 5) {
      this.super_bomb(block);
    } else {
      this.checkRemoveCount(block);
    }    

    this.reloadGrid();

    this.calcScore();

    this.spawnBlocks();
  },

  super_bomb: function(block) {
    let block_iX = block.ix;
    let block_iY = block.iy;

    let radius = 2;
    for (let r = 0; r <= radius; r++) {
      for (let deg = 0; deg <= 360; deg += 15) {
        let rad = (deg / 180.0) * 3.18
        let x = Math.round(Math.cos(rad) * r)
        let y = Math.round(Math.sin(rad) * r)

        this.scene.removeObjectByIndex(block_iX + x, block_iY + y);        
      }
    }
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

  calcScore: function() {
    let score = 0
    for (let w = 0; w < this.scene.width; w++) {
        for (let h = 0; h < this.scene.height; h++) {
            const block = this.scene.sceneObjects[h][w];
            if (block == undefined) score++;
        }
    }

    if (score) UI.Update(score);
  },

  spawnBlocks: function() {
    for (let w = 0; w < this.scene.width; w++) {
        let need_blocks = 0;
  
        for (let h = 0; h < this.scene.height; h++) {
            const block = this.scene.sceneObjects[h][w];
            if (block) break;
            if (block == undefined) need_blocks++;
        }

        for (let i = 1; i <= need_blocks; i++)
        {
            let blockX = w * this.scene.blockWidth * this.scene.blockScale;
            let blockY = (i - 1) * this.scene.blockHeight * this.scene.blockScale - (i - 1) * this.scene.offsetY;
    
            let blockW = this.scene.blockWidth * this.scene.blockScale;
            let blockH = this.scene.blockHeight * this.scene.blockScale;

            const siper_block = Util.getRandomInt(1, 10) == 7;

            const new_block = new Block(blockX, blockY - (need_blocks * blockH), w, (i - 1), blockW, blockH, 
              (siper_block) ? 5 : Util.getRandomInt(0, 4));
            new_block.physics.updateData()
            this.scene.sceneObjects[i - 1][w] = new_block
        }
    }
  }
};
