'use strict';

import {Shape} from '../src/app/Shape';
import {Color} from '../src/app/Color';
import {Point} from '../src/app/Point';

describe('Shape Class', () => {
    const color = new Color(1, 2, 3);
    let shape;

    beforeEach(() => {
        shape = new Shape(3, color, ...[
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

    const mapValues = [
        {id: "00", value: true},
        {id: "01", value: true},
        {id: "02", value: true},
        {id: "10", value: true},
        {id: "11", value: false},
        {id: "12", value: false},
        {id: "20", value: true},
        {id: "21", value: false},
        {id: "22", value: false}
    ];

    Object.keys(mapValues).forEach((item) => {
        it(`field ${item.id} should be marked as ${item.value ? 'available' : 'unavailable'}`, () => {
            expect(shape.fields.get(item.id)).toBe(item.value);
        });
    });
});
