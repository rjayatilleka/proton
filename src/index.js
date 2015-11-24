const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const rx = require('rx');
const appRoot = require('app-root-path');
const Tail = require('tail').Tail;
const ipcRenderer = require('electron').ipcRenderer;

// $('#display').setAttribute('src', appRoot + '/images/example1.svg');

const adjust = (channel, opacity) =>
  Array.from($$('.channel' + channel))
    .forEach(e => e.style.opacity = opacity);

ipcRenderer.on('targetLog', (e, targetLog) => {
  const tail = rx.Observable.fromEvent(new Tail(targetLog), 'line');

  tail.map(line => line.split(' '))
    .map(splitLine => splitLine.map(num => parseInt(num, 16)))
    .tap(channelValues => console.log(channelValues))
    .subscribe(channelValues =>
      channelValues.forEach((channelValue, channel) => adjust(channel, channelValue)));
});
