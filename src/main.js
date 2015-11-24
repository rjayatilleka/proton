const appRoot = require('app-root-path');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', () => app.quit());

app.on('ready', () => {
  // Window set up
  mainWindow = new BrowserWindow({width: 800, height: 600});
  webContents = mainWindow.webContents;
  mainWindow.loadURL('file://' + appRoot + '/src/index.html');
  webContents.openDevTools();
  mainWindow.on('closed', () => mainWindow = null);

  // Send argument for log file
  webContents.on('did-finish-load', () => {
    webContents.send('targetLog', process.argv[2]);
  });
});