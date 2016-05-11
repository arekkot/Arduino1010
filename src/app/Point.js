'use strict';

export class Point {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor (x, y) {
        this.cords = {
            x,
            y
        };
    }

    get x () {
        return this.cords.x;
    }

    get y () {
        return this.cords.y;
    }
}
