'use strict';

const appRoot = require('app-root-path')
const fs = require('fs')
const rx = require('rx')
const Tail = require('tail').Tail
const ipcRenderer = require('electron').ipcRenderer

const drawSVGFile = (drawing, path) =>
  fs.readFile(path, 'utf8', (err, data) => drawing.svg(data))

const adjust = (drawing) => (opacity, channel) =>
  drawing.select('.channel' + channel).style('opacity', opacity)

const makeTailerStream = (targetLog) =>
  rx.Observable.fromEvent(new Tail(targetLog), 'line')

const setupGraph = (drawing, tailerStream) =>
  tailerStream
    .map(line => line.split(' '))
    .map(splitLine => splitLine.map(num => parseInt(num, 16) / 256))
    .tap(opacityValues => console.log(opacityValues))
    .subscribe(opacityValues => opacityValues.forEach(adjust(drawing)))

const main = () => {
  const drawing = SVG('main').size(400, 200)
  drawSVGFile(drawing, appRoot + '/images/example1.svg')

  ipcRenderer.on('targetLog', (e, targetLog) =>
    setupGraph(drawing, makeTailerStream(targetLog)))
}

main()
