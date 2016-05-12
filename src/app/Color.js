export class Color {
    /**
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     */
    constructor (red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    /**
     * @returns {number}
     */
    get r () {
        return this.red;
    }

    /**
     * @returns {number}
     */
    get g () {
        return this.green;
    }

    /**
     * @returns {number}
     */
    get b () {
        return this.blue;
    }

    /**
     * @returns {string}
     */
    get hex () {
        return this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
    }
}
