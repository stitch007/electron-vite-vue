import { BrowserWindow, app } from 'electron'
import { CustomScheme } from './custom'

let mainWindows: BrowserWindow

app.whenReady().then(() => {
  mainWindows = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  mainWindows.removeMenu()
  if (process.argv[2]) {
    mainWindows.loadURL(process.argv[2])
  } else {
    CustomScheme.registerScheme()
    mainWindows.loadURL('app://index.html')
  }
})
