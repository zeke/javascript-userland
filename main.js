const {app, BrowserWindow, ipcMain} = require('electron')
const Config = require('electron-config')
const config = new Config()
let win

app.on('ready', () => {
  let opts = {show: false}
  Object.assign(opts, config.get('winBounds'))
  win = new BrowserWindow(opts)
  win.loadURL(`file://${__dirname}/app/index.html`)

  // Persist devtools open/closed state
  win.webContents
    .on('devtools-opened', () => {
      config.set('showDevtools', true)
    })
    .on('devtools-closed', () => {
      config.set('showDevtools', false)
    })

  // Open devtools if they were open last time
  if (config.get('showDevtools')) win.webContents.openDevTools()

  win.once('ready-to-show', win.show)

  // save window size and position
  win.on('close', () => {
    config.set('winBounds', win.getBounds())
  })
})

ipcMain.on('notes', (event, notes) => {
  console.log(notes)
})
