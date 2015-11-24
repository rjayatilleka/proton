const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const appRoot = require('app-root-path');

var mainWindow = null;

app.on('window-all-closed', () => app.quit());

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + appRoot + '/src/index.html');
  mainWindow.on('closed', () => mainWindow = null);
});
