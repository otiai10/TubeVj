const { ipcRenderer } = require('electron')

const __main__ = () => {
  const [b0, b1] = document.querySelectorAll('button');
  b0.addEventListener('click', ev => {
    ipcRenderer.send('video', {action: 'play', index: 0});
  });
  b1.addEventListener('click', ev => {
    ipcRenderer.send('video', {action: 'play', index: 1});
  });

  const fader = document.querySelector('input[type=range]');
  fader.addEventListener('input', ev => {
    ipcRenderer.send('video', {action: 'fade', fade: parseInt(ev.target.value)});
  });
};

window.onload = () => __main__();
