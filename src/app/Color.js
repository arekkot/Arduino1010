'use strict';

const COLOR_RED = Symbol('Color Red'),
    COLOR_GREEN = Symbol('Color Green'),
    COLOR_BLUE = Symbol('Color Blue');

export class Color {
    /**
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     */
    constructor (red, green, blue) {
        this[COLOR_RED] = red;
        this[COLOR_GREEN] = green;
        this[COLOR_BLUE] = blue;
    }

    /**
     * @returns {number}
     */
    get r () {
        return this[COLOR_RED];
    }

    /**
     * @returns {number}
     */
    get g () {
        return this[COLOR_GREEN];
    }

    /**
     * @returns {number}
     */
    get b () {
        return this[COLOR_BLUE];
    }

    /**
     * @returns {string}
     */
    get hex () {
        return this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
    }
}
