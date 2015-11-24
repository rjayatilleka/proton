const $ = document.querySelector.bind(document);
const appRoot = require('app-root-path')
const rx = require('rx');
const Tail = require('tail').Tail;

const tail = new Tail("/tmp/log");
rx.Observable.fromEvent(tail, 'line').subscribe(line => console.log('rx: ' + line));
tail.on('line', line => console.log('node: ' + line));
