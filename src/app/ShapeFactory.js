'use strict';

import {Shape} from './Shape';
import {Color} from './Color';
import {Point} from './Point';

const SHAPE_FACTORY_SHAPES = Symbol('Shape Factory Shapes');

export class ShapeFactory {
    /**
     * @param {{color: number[], points: number[]}[]} config
     */
    constructor (config) {
        this[SHAPE_FACTORY_SHAPES] = config.map(shape => {
            const color = new Color(...shape.color),
                points = shape.points.map(point => {
                    return new Point(...point);
                });

            return new Shape(color, ...points);
        });

    }

    /**
     * @returns {Shape}
     */
    make () {
        const key = this[SHAPE_FACTORY_SHAPES].length * Math.random() << 0;

        return this[SHAPE_FACTORY_SHAPES][key].clone;
    }
}
