'use strict';

import * as EventEmitter from 'event-emitter';
import * as pointsCompare from './matchers/pointsCompare';
import {Area} from '../src/app/Area';
import {Color} from '../src/app/Color';
import {Controller} from '../src/app/Controller';
import {Point} from '../src/app/Point';
import {Shape} from '../src/app/Shape';
import {Config} from './stub/gui/config';

describe('Controller Class', () => {
    const event = EventEmitter.default(),
        area = new Area(Config.MAP_SIZE),
        availableShapes = new Map();

    let controller,
        shape;

    beforeEach(() => {
        jasmine.addMatchers(pointsCompare.default);

        controller = new Controller(event, area, availableShapes);

        availableShapes.set(1, shape = new Shape(
            new Color(255, 0, 0),
            ...[
                new Point(1, 1),
                new Point(1, 2),
                new Point(2, 1),
                new Point(2, 2)
            ]
        ));
    });

    it('is initializable', () => {
        expect(controller instanceof Controller).toBeTruthy();
    });

    it('emits event after shape selection', () => {
        spyOn(event, 'emit');

        controller.selectProposition(0);
        expect(controller.selectedPoint).toBe(null);
        expect(event.emit).toHaveBeenCalledWith('gui.selectProposition', null, null);

        controller.selectProposition(1);
        expect(controller.selectedPoint).toBeEqualWithPoint(4, 4);
        expect(event.emit).toHaveBeenCalledWith('gui.selectProposition', 1, jasmine.any(Point));
    });

    it('cannot move shape when shape is not selected', () => {
        expect(controller.canMoveShape()).toBeFalsy();
    });

    it('can move shape when has been selected', () => {
        controller.selectProposition(1);
        expect(controller.canMoveShape()).toBeTruthy();
    });

    it('emits event after changing shape position', () => {
        spyOn(event, 'emit');

        controller.selectProposition(1);

        controller.moveUp();
        expect(controller.selectedPoint).toBeEqualWithPoint(4, 3);
        expect(event.emit).toHaveBeenCalledWith('gui.selectProposition', 1, jasmine.any(Point));

        controller.moveLeft();
        expect(controller.selectedPoint).toBeEqualWithPoint(3, 3);
        expect(event.emit).toHaveBeenCalledWith('gui.selectProposition', 1, jasmine.any(Point));

        controller.moveDown();
        expect(controller.selectedPoint).toBeEqualWithPoint(3, 4);
        expect(event.emit).toHaveBeenCalledWith('gui.selectProposition', 1, jasmine.any(Point));

        controller.moveRight();
        expect(controller.selectedPoint).toBeEqualWithPoint(4, 4);
        expect(event.emit).toHaveBeenCalledWith('gui.selectProposition', 1, jasmine.any(Point));
    });

    it('does not emit event during move the empty shape', () => {
        spyOn(event, 'emit');

        controller.moveUp();
        controller.moveLeft();
        controller.moveDown();
        controller.moveRight();

        expect(event.emit).not.toHaveBeenCalled();
    });

    it('does not emit event when shape cannot be moved', () => {
        spyOn(event, 'emit');

        controller.selectProposition(1); // [1]
        controller.moveUp(); // 4, 3 [2]
        controller.moveUp(); // 4, 2 [3]
        controller.moveUp(); // 4, 1 [4]
        expect(controller.selectedPoint).toBeEqualWithPoint(4, 1);
        controller.moveUp(); // 4, 1 [4]
        expect(controller.selectedPoint).toBeEqualWithPoint(4, 1);
        expect(event.emit).toHaveBeenCalledTimes(4);

        controller.moveLeft(); // 3, 1 [5]
        controller.moveLeft(); // 2, 1 [6]
        controller.moveLeft(); // 1, 1 [7]
        expect(controller.selectedPoint).toBeEqualWithPoint(1, 1);
        controller.moveLeft(); // 1, 1 [7]
        expect(controller.selectedPoint).toBeEqualWithPoint(1, 1);
        expect(event.emit).toHaveBeenCalledTimes(7);

        controller.moveRight(); // 2, 1 [8]
        controller.moveRight(); // 3, 1 [9]
        controller.moveRight(); // 4, 1 [10]
        controller.moveRight(); // 5, 1 [11]
        controller.moveRight(); // 6, 1 [12]
        controller.moveRight(); // 7, 1 [13]
        expect(controller.selectedPoint).toBeEqualWithPoint(7, 1);
        controller.moveRight(); // 7, 1 [13]
        expect(controller.selectedPoint).toBeEqualWithPoint(7, 1);
        expect(event.emit).toHaveBeenCalledTimes(13);

        controller.moveDown(); // 7, 2 [14]
        controller.moveDown(); // 7, 3 [15]
        controller.moveDown(); // 7, 4 [16]
        controller.moveDown(); // 7, 5 [17]
        controller.moveDown(); // 7, 6 [18]
        controller.moveDown(); // 7, 7 [19]
        expect(controller.selectedPoint).toBeEqualWithPoint(7, 7);
        controller.moveDown(); // 7, 7 [19]
        expect(controller.selectedPoint).toBeEqualWithPoint(7, 7);
        expect(event.emit).toHaveBeenCalledTimes(19);
    });

    it('does not emit event during paste the empty shape', () => {
        spyOn(event, 'emit');

        controller.pasteBlock();

        expect(event.emit).not.toHaveBeenCalled();
    });

    it('emits event after paste shape (game is in progress)', () => {
        spyOn(area, 'canAppendShapeAnywhere').and.returnValue(true);

        spyOn(area, 'appendShape');
        spyOn(availableShapes, 'set');
        spyOn(event, 'emit');

        controller.selectProposition(1);

        expect(controller.pasteBlock()).toBeTruthy();
        expect(area.appendShape).toHaveBeenCalledWith(shape, jasmine.any(Point));
        expect(availableShapes.set).toHaveBeenCalledWith(1, null);
        expect(event.emit).toHaveBeenCalledWith('gui.appendedShape', 4);
        expect(event.emit).toHaveBeenCalledWith('gui.drawBlocks', shape, jasmine.any(Point));
        expect(event.emit).toHaveBeenCalledWith('gui.removeProposition', shape, 1);
        expect(event.emit).toHaveBeenCalledWith('gui.makeNewProposition', availableShapes, 1);
        expect(event.emit).toHaveBeenCalledWith('gui.removeFilledRowsAndCells');
        expect(event.emit).toHaveBeenCalledWith('gui.selectProposition', null, null);
        expect(event.emit).not.toHaveBeenCalledWith('gui.gameOver');
    });

    it('emits event after paste shape (game is over)', () => {
        spyOn(area, 'canAppendShapeAnywhere').and.returnValue(false);
        spyOn(area, 'appendShape');
        spyOn(availableShapes, 'set');
        spyOn(event, 'emit');

        controller.selectProposition(1);

        expect(controller.pasteBlock()).toBeTruthy();
        expect(area.appendShape).toHaveBeenCalledWith(shape, jasmine.any(Point));
        expect(availableShapes.set).toHaveBeenCalledWith(1, null);
        expect(event.emit).toHaveBeenCalledWith('gui.appendedShape', 4);
        expect(event.emit).toHaveBeenCalledWith('gui.drawBlocks', shape, jasmine.any(Point));
        expect(event.emit).toHaveBeenCalledWith('gui.removeProposition', shape, 1);
        expect(event.emit).toHaveBeenCalledWith('gui.makeNewProposition', availableShapes, 1);
        expect(event.emit).toHaveBeenCalledWith('gui.removeFilledRowsAndCells');
        expect(event.emit).toHaveBeenCalledWith('gui.selectProposition', null, null);
        expect(event.emit).toHaveBeenCalledWith('gui.gameOver');
    });
});
