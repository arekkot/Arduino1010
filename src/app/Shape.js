'use strict';

export class Shape {
    /**
     *
     * @param {number} size
     * @param {Color} color
     * @param {Point[]} points
     */
    constructor (size, color, ...points) {
        this.shapeSize = size;
        this.shapeColor = color;
        this.shapeFields = new Map();

        for (let i = 0; i < size; ++i) {
            for (let j = 0; j < size; ++j) {
                this.shapeFields.set(`${i}${j}`, false);
            }
        }

        for (let point of points) {
            this.shapeFields.set(point.id, true);
        }
    }

    /**
     * @returns {number}
     */
    get size () {
        return this.shapeSize;
    }

    /**
     * @returns {Color}
     */
    get color () {
        return this.shapeColor;
    }

    /**
     * @returns {Map}
     */
    get fields () {
        return this.shapeFields;
    }
}
