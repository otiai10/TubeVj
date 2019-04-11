const { ipcRenderer } = require('electron')

const __main__ = () => {
  // console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
  ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(event);
    console.log(arg); // prints "pong"
  });
  ipcRenderer.send('asynchronous-message', 'ping');
};
window.onload = () => __main__();
