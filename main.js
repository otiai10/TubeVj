const { app, BrowserWindow } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  win.loadFile('main.html');
}

app.on('ready', createWindow);

