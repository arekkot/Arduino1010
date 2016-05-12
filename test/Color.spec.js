'use strict';

import {Color} from '../src/app/Color';

describe('Color Class', () => {
    let color;

    beforeEach(() => {
        color = new Color(255, 100, 50);
    });

    it('is initializable', () => {
        expect(color instanceof Color).toBeTruthy();
    });

    it('returns color\'s details', () => {
        expect(color.r).toBe(255);
        expect(color.g).toBe(100);
        expect(color.b).toBe(50);
    });

    it('returns color as hex string', () => {
        expect(color.hex).toBe('ff6432');
    });
});
