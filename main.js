const { app, BrowserWindow, ipcMain } = require('electron');


const __createMasterViewWindow = () => {
  const __project = 'master-window';
  const win = new BrowserWindow({
    backgroundColor: '#ddd',
    icon: `file://${__dirname}/dist/${__project}/assets/logo.png`,
  });
  win.loadURL(`file://${__dirname}/dist/${__project}/index.html`);
  return win;
};

const __createControllerViewWindow = () => {
  const __project = 'controller-window';
  const win = new BrowserWindow({
    width: 800,
    height: 920,
    x: 0, y: 0,
    icon: `file://${__dirname}/dist/${__project}/assets/logo.png`,
  });
  win.loadURL(`file://${__dirname}/dist/${__project}/index.html`);
  return win;
};

const __createMessagingProxy = (master, controller) => {
  ipcMain.on('video', (ev, arg) => {
    // console.log(arg);
    master.webContents.send('video', arg)
  });
};

const __main__ = () => {
  const master = __createMasterViewWindow();
  const controller = __createControllerViewWindow();
  __createMessagingProxy(master, controller);
};

app.on('ready', __main__);
