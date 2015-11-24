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
  rx.Observable
    .fromEvent(new Tail(targetLog), 'line')
    .throttle(20) // milliseconds

const lineParser = (slice, radix, denominator) => (line) =>
  line.slice(slice).split(' ').map(num => parseInt(num, radix) / denominator)
const parseLineVixen = lineParser(30, 16, 256)
const parseLineSimple = lineParser(0, 10, 100)

const setupGraph = (drawing, tailerStream) =>
  tailerStream
    .map(parseLineSimple)
    .tap(opacityValues => console.log(opacityValues))
    .subscribe(opacityValues => opacityValues.forEach(adjust(drawing)))

const main = () => {
  const drawing = SVG('main').size(400, 200)
  drawSVGFile(drawing, appRoot + '/images/example1.svg')

  ipcRenderer.on('targetLog', (e, targetLog) =>
    setupGraph(drawing, makeTailerStream(targetLog)))
}

main()
