const { app, BrowserWindow } = require('electron');

const __project = 'tube-vj';

const __main__ = () => {
  const win = new BrowserWindow({
    backgroundColor: '#ddd',
    icon: `file://${__dirname}/dist/${__project}/assets/logo.png`,
  });
  win.loadURL(`file://${__dirname}/dist/${__project}/index.html`);
};

app.on('ready', __main__);
