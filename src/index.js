const $ = document.querySelector.bind(document);
const rx = require('rx');
const Tail = require('tail').Tail;
const ipcRenderer = require('electron').ipcRenderer;

const tail = new Tail("/tmp/log");
rx.Observable
  .fromEvent(tail, 'line')
  .subscribe(line => console.log('rx: ' + line));
tail.on('line', line => console.log('node: ' + line));

ipcRenderer.on('arguments', (e, argv) => {
  console.log(argv);
});
