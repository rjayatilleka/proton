const appRoot = require('app-root-path');
const fs = require('fs');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', () => app.quit());

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + appRoot + '/src/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => mainWindow = null);
});
