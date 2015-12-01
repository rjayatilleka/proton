import yaml from 'js-yaml'
import fs from 'fs'
import {app, BrowserWindow} from 'electron'

let mainWindow = null

app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
  fs.readFile('./build/config.yaml', 'utf8', (err, data) => {
    const config = yaml.safeLoad(data)

    // Window set up
    mainWindow = new BrowserWindow(config.size)
    mainWindow.loadURL('file://' + __dirname + '/index.html')
    mainWindow.on('closed', () => mainWindow = null)

    const webContents = mainWindow.webContents
    webContents.openDevTools()

    webContents.on('did-finish-load', () =>
      webContents.send('config', config))
  })
})
