const $ = document.querySelector.bind(document)
const rx = require('rx')

const main = $('#main');
rx.Observable.interval(1000).subscribe(i => main.innerHTML += (i + '<br>\n'));