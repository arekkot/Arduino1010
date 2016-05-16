'use strict';

import {Grid} from '../src/app/Grid';

describe('Grid Class', () => {
    let grid, context;

    beforeEach(() => {
        grid = new Grid(context);
    });

    it('is initializable', () => {
        expect(grid instanceof Grid).toBeTruthy();
    });

    // todo: add full test for Grid.draw() method
});
