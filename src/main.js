'use strict';

const appRoot = require('app-root-path')

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow = null

app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
  // Window set up
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL('file://' + appRoot + '/src/index.html')
  mainWindow.on('closed', () => mainWindow = null)

  const webContents = mainWindow.webContents
  webContents.openDevTools()

  // Send argument for log file
  webContents.on('did-finish-load', () =>
    webContents.send('targetLog', process.argv[2]))
})