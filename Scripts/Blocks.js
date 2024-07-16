import { Physics } from './Physics.js'

export class Block {
    constructor(x, y, ix, iy, w, h, index, physics = false) {
        this.x = x
        this.y = y
        this.ix = ix
        this.iy = iy
        this.w = w
        this.h = h
        this.index = index
        this.physics = new Physics(this, 0.2)
    }
}