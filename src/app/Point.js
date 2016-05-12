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

    /**
     * @returns {number}
     */
    get x () {
        return this.cords.x;
    }

    /**
     * @returns {number}
     */
    get y () {
        return this.cords.y;
    }

    /**
     * @returns {string}
     */
    get id () {
        return `${this.x}${this.y}`;
    }
}
