'use strict';

import {Config} from './config';

/**
 * @param {CanvasRenderingContext2D} context
 * @param {Map} canvasPosition
 * @param {boolean|null} isSuccess
 * @param {Point} points
 * @returns {void}
 */
export function drawBorder (context, canvasPosition, isSuccess, ...points) {
    context.save();
    context.lineWidth = 2;

    if (true === isSuccess) {
        context.strokeStyle = Config.COLOR.GREEN;
    } else if (false === isSuccess) {
        context.strokeStyle = Config.COLOR.RED;
    } else {
        context.strokeStyle = Config.COLOR.WHITE;
    }

    points.forEach(item => {
        const position = canvasPosition.get(item.id);
        context.strokeRect(position.x - 2, position.y - 2, Config.STROKE_SIZE, Config.STROKE_SIZE);
    });

    context.restore();
}
