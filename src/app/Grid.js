'use strict';

import {Config} from './gui/config';
import {Point} from './Point';

export class Grid {
    /**
     * @param {CanvasRenderingContext2D} context
     */
    constructor (context) {
        this.context = context;
    }

    /**
     * Draw grid on given Canvas Context.
     * Returns object with positions for blocks.
     *
     * @param {number} startX
     * @param {number} startY
     * @param {number} gridSize
     * @param {number} columnSize
     * @param {number} columnPadding
     * @returns {Map}
     */
    draw (startX, startY, gridSize, columnSize, columnPadding) {
        const columnNumber = Math.ceil(gridSize / columnSize);

        if (columnNumber < 2) {
            throw new Error('Number of columns has to be bigger or equal to 2.');
        }

        this.context.save();
        this.context.lineWidth = 1;
        this.context.strokeStyle = Config.COLOR.GREY;
        this.context.fillStyle = Config.COLOR.GREY;

        startX += 0.5;
        startY += 0.5;

        this.context.strokeRect(startX, startY, gridSize, gridSize);

        for (let i = 1; i < columnNumber; ++i) {
            const newX = startX + i * columnSize,
                newY = startY + i * columnSize;

            this.context.beginPath();
            this.context.moveTo(newX, startY);
            this.context.lineTo(newX, startY + gridSize);
            this.context.stroke();

            this.context.beginPath();
            this.context.moveTo(startX, newY);
            this.context.lineTo(startX + gridSize, newY);
            this.context.stroke();
        }

        this.context.restore();

        return makeMap(columnNumber, startX, startY, columnSize, columnPadding);
    }
}

/**
 * Draw grid on given Canvas Context.
 * Returns object with positions for blocks.
 *
 * @param {number} columnNumber
 * @param {number} startX
 * @param {number} startY
 * @param {number} columnSize
 * @param {number} columnPadding
 * @returns {Map}
 */
function makeMap (columnNumber, startX, startY, columnSize, columnPadding) {
    const canvasPosition = new Map();
    canvasPosition.set('COLUMN_SIZE', columnSize - 2 * columnPadding);

    for (let x = 0; x < columnNumber; ++x) {
        for (let y = 0; y < columnNumber; ++y) {
            canvasPosition.set(`${x}${y}`, new Point(
                startX + columnPadding + x * columnSize,
                startY + columnPadding + y * columnSize
            ));
        }
    }

    return canvasPosition;
}
