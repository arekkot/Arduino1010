'use strict';

import {Point} from '../src/app/Point';

describe('Point Class', () => {
    let point;

    beforeEach(() => {
        point = new Point(2, 5);
    });

    it('is initializable', () => {
        expect(point instanceof Point).toBeTruthy();
    });

    it('returns point coordinates', () => {
        expect(point.x).toBe(2);
        expect(point.y).toBe(5);
    });

    it('returns point id', () => {
        expect(point.id).toBe('25');
    });
});
