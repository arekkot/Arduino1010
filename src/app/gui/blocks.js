'use strict';

import {Color} from '../Color';

/**
 * @param {CanvasRenderingContext2D} context
 * @param {Map} canvasPosition
 * @param {Point} points
 * @returns {void}
 */
export function clearBlocks (context, canvasPosition, ...points) {
    const color = new Color(255, 255, 255);

    points.forEach(item => {
        drawBlock(context, item, canvasPosition, color);
    });
}

/**
 * @param {CanvasRenderingContext2D} context
 * @param {Point} point
 * @param {Map} canvasPosition
 * @param {Color} color
 * @returns {void}
 */
export function drawBlock (context, point, canvasPosition, color) {
    context.save();

    const block = new Path2D(),
        canvasCords = canvasPosition.get(point.id),
        blockSize = canvasPosition.get('COLUMN_SIZE');

    block.rect(canvasCords.x, canvasCords.y, blockSize, blockSize);
    context.fillStyle = `#${color.hex}`;
    context.fill(block);

    context.restore();
}
