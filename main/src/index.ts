import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';

const serve = process.defaultApp;
let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1180, height: 720 });
  mainWindow.loadURL(
      serve
      ? 'http://localhost:3000'
      : `file://${path.join(process.resourcesPath!, 'extraResources/renderer/index.html')}`
  );
  if (serve) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => (mainWindow = null));
}

function createMenu() {
  if (serve) {
    return;
  }

  if (process.platform !== 'darwin') {
    Menu.setApplicationMenu(null);
    return;
  }
}


app.on('ready', () =>{
  createWindow();
  createMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
