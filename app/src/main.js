'use strict';

const appRoot = require('app-root-path')
const yaml = require('js-yaml')
const fs = require('fs')

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow = null

app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
  fs.readFile(appRoot + '/app/config/dev.yaml', 'utf8', (err, data) => {
    const config = yaml.safeLoad(data)

    // Window set up
    mainWindow = new BrowserWindow(config.size)
    mainWindow.loadURL('file://' + appRoot + '/app/src/index.html')
    mainWindow.on('closed', () => mainWindow = null)

    const webContents = mainWindow.webContents
    webContents.openDevTools()

    webContents.on('did-finish-load', () =>
      webContents.send('config', config))
  })
})
