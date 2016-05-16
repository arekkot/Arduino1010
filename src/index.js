'use strict';

import * as EventEmitter from 'event-emitter';
import {Area} from './app/Area';
import {Point} from './app/Point';
import {Grid} from './app/Grid';
import {Controller} from './app/Controller';
import {Config} from './app/gui/config';
import {drawBorder} from './app/gui/borders';
import {drawBlock, clearBlocks, generateAvailableBlocks} from './app/gui/blocks';

const context = document.getElementById('arduino1010').getContext('2d'),
    event = EventEmitter.default(),
    availableBlocks = new Map(),
    canvasPositionMap = new Map(),
    gridFactory = new Grid(context);

canvasPositionMap.set(0, gridFactory.draw(10, 10, 600, Config.GRID_SIZE, 4.5));
canvasPositionMap.set(1, gridFactory.draw(700, 17, 150, Config.SMALL_BLOCK_SIZE, 2.5));
canvasPositionMap.set(2, gridFactory.draw(700, 217, 150, Config.SMALL_BLOCK_SIZE, 2.5));
canvasPositionMap.set(3, gridFactory.draw(700, 417, 150, Config.SMALL_BLOCK_SIZE, 2.5));

const gameArea = new Area(),
    gameController = new Controller(event, gameArea, availableBlocks);

context.font = "48px serif";
context.fillText("1.", 650, 50);
context.fillText("2.", 650, 250);
context.fillText("3.", 650, 450);

generateAvailableBlocks(availableBlocks);

for (let [index, shape] of availableBlocks) {
    shape.points.forEach(point => {
        drawBlock(context, point, canvasPositionMap.get(index), shape.color);
    });
}

let points = 0,
    previousPoints = null;

event.on('gui.makeNewProposition', (availableBlocks, selectedKey) => {
    generateAvailableBlocks(availableBlocks);

    const newShape = availableBlocks.get(selectedKey);

    newShape.points.forEach(point => {
        drawBlock(context, point, canvasPositionMap.get(selectedKey), newShape.color);
    });
});

event.on('gui.drawBlocks', (selectedShape, selectedPoint) => {
    selectedShape.points.forEach(point => {
        drawBlock(context, point.move(selectedPoint), canvasPositionMap.get(0), selectedShape.color);
    });
});

event.on('gui.removeProposition', (selectedShape, selectedIndex) => {
    clearBlocks(context, canvasPositionMap.get(selectedIndex), ...selectedShape.points);
});

event.on('gui.removeFilledRowsAndCells', () => {
    const pointsToRemove = gameArea.filledRowsAndCells;

    clearBlocks(context, canvasPositionMap.get(0), ...pointsToRemove);
    gameArea.clearFields(...pointsToRemove);
});

event.on('gui.selectProposition', (selectedKey, selectedPoint) => {
    const mainCanvasMap = canvasPositionMap.get(0);

    if (previousPoints) {
        drawBorder(context, mainCanvasMap, null, ...previousPoints);
        previousPoints = null;
    }

    const selectedShape = availableBlocks.get(selectedKey);

    if (!selectedShape || !selectedPoint) {
        return;
    }

    const status = gameArea.canAppendShape(selectedShape, selectedPoint);

    previousPoints = selectedShape.points.map(point => {
        return point.move(selectedPoint);
    });

    drawBorder(context, mainCanvasMap, status, ...previousPoints);
});

event.on('gui.gameOver', () => {
    console.log('Game Over');
    document.body.innerHTML = 'Game Over. Please - Refresh!';
});

event.on('gui.appendedShape', (earnedPoints) => {
    points += earnedPoints;
    console.log('Score:', points);
});

// todo: remove all of following code
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 37) {
        gameController.moveLeft();
    } else if (e.keyCode == 38) {
        gameController.moveUp();
    } else if (e.keyCode == 39) {
        gameController.moveRight();
    } else if (e.keyCode == 40) {
        gameController.moveDown();
    } else if (e.keyCode == 32) {
        gameController.pasteBlock();
    } else if (e.keyCode == 13) {
        gameController.pasteBlock();
    } else if (e.keyCode == 48) {
        gameController.selectProposition(0);
    } else if (e.keyCode == 49) {
        gameController.selectProposition(1);
    } else if (e.keyCode == 50) {
        gameController.selectProposition(2);
    } else if (e.keyCode == 51) {
        gameController.selectProposition(3);
    }
});
