const { ipcRenderer } = require('electron')

const __main__ = () => {
  // console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
  // ipcRenderer.on('asynchronous-reply', (event, arg) => {
  //   console.log(arg); // prints "pong"
  // });
  // ipcRenderer.send('asynchronous-message', 'ping');

  const players = {};

  players[0] = new YT.Player('player-0', {
    videoId: 'ikp5cokKkk0',
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 1,
      loop: 1,
    },
    events: {
      'onReady': (ev) => console.log('ready', 1, ev),
      'onStateChange': (ev) => console.log(ev.data),
    },
  });

  players[1] = new YT.Player('player-1', {
    // videoId: '0pXYp72dwl0',
    videoId: 'P0wH3npCB2Q',
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 1,
      loop: 1,
    },
    events: {
      'onReady': (ev) => console.log('ready', 2, ev),
      'onStateChange': (ev) => console.log(ev.data),
    },
  });

  ipcRenderer.on('video', (event, arg) => {
    switch(arg.action) {
    case 'fade':
      console.log(arg.fade);
      players[0].a.style.opacity = `${(100 - arg.fade) / 100}`;
      players[1].a.style.opacity = `${arg.fade / 100}`;
      break;
    case 'play':
    default:
      console.log(arg);
      players[arg.index].playVideo();
    }
  });

};

window.onload = () => __main__();
