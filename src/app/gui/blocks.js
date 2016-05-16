'use strict';

import {Config} from './config';
import {Color} from '../Color';
import {ShapeFactory} from '../ShapeFactory';

const shapeFactory = new ShapeFactory(Config.BLOCKS);

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

/**
 * @param {Map} availableBlocks
 */
export function generateAvailableBlocks (availableBlocks) {
    if (availableBlocks.size === 0) {
        availableBlocks.set(1, null);
        availableBlocks.set(2, null);
        availableBlocks.set(3, null);
    }

    for (let [key, shape] of availableBlocks) {
        if (shape === null) {
            availableBlocks.set(key, shapeFactory.make());
        }
    }
}
