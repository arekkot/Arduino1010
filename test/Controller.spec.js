'use strict';

import * as EventEmitter from 'event-emitter';
import {Controller} from '../src/app/Controller';
import {Area} from '../src/app/Area';

describe('Controller Class', () => {
    let controller,
        event,
        area,
        availableShapes;

    beforeEach(() => {
        event = EventEmitter.default();
        area = new Area();
        availableShapes = new Map();

        controller = new Controller(event, area, availableShapes);
    });

    it('is initializable', () => {
        expect(controller instanceof Controller).toBeTruthy();
    });

    // todo: add full tests for all public Controller's methods
});
