'use strict';

import {Shape} from '../src/app/Shape';
import {Color} from '../src/app/Color';
import {Point} from '../src/app/Point';

describe('Shape Class', () => {
    const color = new Color(1, 2, 3);
    let shape;

    beforeEach(() => {
        shape = new Shape(color, ...[
            new Point(0, 0),
            new Point(1, 0),
            new Point(2, 0),
            new Point(0, 1),
            new Point(0, 2)
        ]);
    });

    it('is initializable', () => {
        expect(shape instanceof Shape).toBeTruthy();
    });

    it('clones object', () => {
        const clonedShape = shape.clone;

        expect(clonedShape instanceof Shape).toBeTruthy();
        expect(clonedShape).not.toBe(shape);

        expect(clonedShape.color instanceof Color).toBeTruthy();

        clonedShape.points.forEach(item => {
            expect(item instanceof Point).toBeTruthy();
        });
    });
});
