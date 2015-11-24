const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const rx = require('rx');
const appRoot = require('app-root-path');
const Tail = require('tail').Tail;
const ipcRenderer = require('electron').ipcRenderer;

$('#display').setAttribute('src', appRoot + '/images/example1.svg');

adjust = (channel, opacity) => {
  elements = $$('.channel' + channel)
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.opacity = opacity;
  };
};

ipcRenderer.on('targetLog', (e, targetLog) => {
  const tail = rx.Observable.fromEvent(new Tail(targetLog), 'line');

  tail.map(line => line.split(' '))
    .map(splitLine => splitLine.map(num => parseInt(num, 16)))
    .subscribe(channels => {
      console.log(channels);
      for (var i = 0; i < channels.length; i++) {
        adjust(i, channels[i]);
      };
    });
});
