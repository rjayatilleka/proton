const app = require('app');
const BrowserWindow = require('browser-window');
const appRoot = require('app-root-path');

var mainWindow = null;

app.on('window-all-closed', () => app.quit());

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + appRoot + '/images/example1.svg');
  mainWindow.on('closed', () => mainWindow = null);
});
