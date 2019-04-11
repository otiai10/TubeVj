const {
    app, BrowserWindow,
    ipcMain,
} = require('electron');

const __createDisplayWindow = () => {
  return new BrowserWindow({width: 800, height: 600, y: 0, x: 4000});
};
const __createControllerWindow = () => {
  return new BrowserWindow({width: 4000, height: 300, x: 0, y: 4000});
};

const __main__ = () => {

  const display = __createDisplayWindow();
  display.loadFile('./html/display.html');

  const controller =__createControllerWindow();
  controller.loadFile('./html/controller.html');

  ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg); // prints "ping"
    event.sender.send('asynchronous-reply', 'pong');
  });

  ipcMain.on('video', (event, arg) => {
    console.log(arg); // prints "ping"
    display.webContents.send('video', arg);
    // event.sender.send('asynchronous-reply', 'pong');
  });


};

app.on('ready', __main__);
