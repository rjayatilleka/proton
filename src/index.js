'use strict';

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

const makeLineParser = (opts) => (line) =>
  line
    .slice(opts.slice)
    .split(' ')
    .map(num => parseInt(num, opts.radix) / opts.denominator)

const setupGraph = (drawing, lineParser, tailerStream) =>
  tailerStream
    .throttle(20) // milliseconds
    .map(lineParser)
    .tap(opacityValues => console.log(opacityValues))
    .subscribe(opacityValues => opacityValues.forEach(adjust(drawing)))

const main = () => {
  ipcRenderer.on('config', (e, config) => {
    const drawing = SVG('main').size(config.size.width, config.size.height)
    const lineParser = makeLineParser(config.parserOpts)
    const tailerStream = makeTailerStream(config.logPath)

    drawSVGFile(drawing, './layout.svg')
    setupGraph(drawing, lineParser, tailerStream)
  })
}

main()
