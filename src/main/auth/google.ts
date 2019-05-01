import { OAuth2Client, OAuth2ClientOptions } from 'google-auth-library';

// declare interface OAuth2ClientOptions {
//   clientId: string;
//   clientSecret?: string;
//   redirectUri: string;
// }

// declare var google: any;

export const scopes = [
  'https://www.googleapis.com/auth/youtube.readonly',
];

export class GoogleOAuthClient {

  private provider: OAuth2Client;

  constructor(private config: OAuth2ClientOptions) {
    this.provider = new OAuth2Client(this.config);
  }

  askCodeOn(win: Electron.BrowserWindow): Promise<string> {
    return new Promise((resolve, reject) => {
      const authURL = this.generateAuthUrl();
      win.loadURL(authURL);
      win.on('page-title-updated', (ev, title) => {
        const url = new URL(ev.sender.getURL());
        if (url.searchParams.get('approvalCode')) {
          win.close();
          return resolve(url.searchParams.get('approvalCode'));
        }
        if ((url.searchParams.get('response') || '').startsWith('error=')) {
          win.close();
          return reject(url.searchParams.get('response'));
        }
        // else: do nothing, stay tuned...
      });
    });
  }

  exchangeCodeForToken(code: string) {
    return this.provider.getToken(code);
  }

  private generateAuthUrl() {
    return this.provider.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

}
