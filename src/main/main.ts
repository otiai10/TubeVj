// const { app, BrowserWindow, ipcMain } = require('electron');
import { app, BrowserWindow, ipcMain } from 'electron';

const createMasterViewWindow = () => {
  const project = 'master-window';
  const win = new BrowserWindow({
    backgroundColor: '#ddd',
    icon: `file://${__dirname}/${project}/assets/logo.png`,
  });
  win.loadURL(`file://${__dirname}/${project}/index.html`);
  return win;
};

const createControllerViewWindow = () => {
  const project = 'controller-window';
  const win = new BrowserWindow({
    width: 800,
    height: 920,
    x: 0, y: 0,
    icon: `file://${__dirname}/${project}/assets/logo.png`,
  });
  win.loadURL(`file://${__dirname}/${project}/index.html`);
  return win;
};

const createMessagingProxy = (master, controller) => {
  ipcMain.on('video', (ev, arg) => {
    // console.log(arg);
    master.webContents.send('video', arg);
  });
};

const main = () => {
  const master = createMasterViewWindow();
  const controller = createControllerViewWindow();
  createMessagingProxy(master, controller);
};

app.on('ready', main);
