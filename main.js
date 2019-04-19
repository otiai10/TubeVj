const { app, BrowserWindow } = require('electron');


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
    icon: `file://${__dirname}/dist/${__project}/assets/logo.png`,
  });
  win.loadURL(`file://${__dirname}/dist/${__project}/index.html`);
  return win;
};

const __main__ = () => {
  __createMasterViewWindow();
  __createControllerViewWindow();
};

app.on('ready', __main__);
