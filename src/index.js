const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const rx = require('rx');
const fs = require('fs');
const appRoot = require('app-root-path');
const Tail = require('tail').Tail;
const ipcRenderer = require('electron').ipcRenderer;

const drawSVGFile = (drawing, path) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading ' + path, err);
    } else {
      drawing.svg(data);
      console.log('Drew svg data');
    }
  });
};

const adjust = (opacity, channel) =>
  Array.from($$('.channel' + channel))
    .forEach(e => e.style.opacity = opacity);

const main = () => {
  const drawing = SVG('main');
  drawSVGFile(drawing, appRoot + '/images/example1.svg');

  // ipcRenderer.on('targetLog', (e, targetLog) => {
  //   const tail = rx.Observable.fromEvent(new Tail(targetLog), 'line');

  //   tail.map(line => line.split(' '))
  //     .map(splitLine => splitLine.map(num => parseInt(num, 16)))
  //     .tap(opacityValues => console.log(opacityValues))
  //     .subscribe(opacityValues => opacityValues.forEach(adjust));
  // });
};

main();
