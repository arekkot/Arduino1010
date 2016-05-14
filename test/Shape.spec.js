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
});
