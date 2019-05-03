import { app, BrowserWindow, ipcMain } from 'electron';
import { GoogleOAuthClient } from './auth/google';
import { environment as env } from '../environments/environment';

const createMasterViewWindow = () => {
  const project = 'master-window';
  const win = new BrowserWindow({
    backgroundColor: '#ddd',
    icon: `file://${__dirname}/${project}/assets/logo.png`,
  });
  win.loadURL(`file://${__dirname}/../${project}/index.html`);
  return win;
};

const createControllerViewWindow = () => {
  const project = 'controller-window';
  const win = new BrowserWindow({
    width: 1200,
    height: 920,
    x: 0, y: 0,
    icon: `file://${__dirname}/${project}/assets/logo.png`,
  });
  win.loadURL(`file://${__dirname}/../${project}/index.html`);
  return win;
};

const createMessagingProxy = (master, controller) => {
  ipcMain.on('video', (ev, arg) => {
    // console.log(arg);
    master.webContents.send('video', arg);
  });
  ipcMain.on('auth', async (ev, arg) => {
    const client = new GoogleOAuthClient({
      clientId: env.OAUTH_CLIENT.client_id,
      clientSecret: env.OAUTH_CLIENT.client_secret,
      redirectUri: env.OAUTH_CLIENT.redirect_uris[0],
    });
    const win = new BrowserWindow({useContentSize: true});
    const code = await client.askCodeOn(win);
    const token = await client.exchangeCodeForToken(code);
    console.log('API Token', token);
  });
};

const main = () => {
  const master = createMasterViewWindow();
  const controller = createControllerViewWindow();
  createMessagingProxy(master, controller);
};

app.on('ready', main);
