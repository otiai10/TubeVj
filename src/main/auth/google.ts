import { BrowserWindow } from 'electron';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';
import { OAuth2Client, OAuth2ClientOptions } from 'google-auth-library';

export const scopes = [
  'https://www.googleapis.com/auth/youtube.readonly',
];

export class GoogleOAuthClient {

  private provider: OAuth2Client;

  constructor(private config: OAuth2ClientOptions) {
    this.provider = new OAuth2Client(this.config);
  }

  getCode(): Promise<string> {
    const auth = new BrowserWindow({ x: 40, y: 40, useContentSize: true });
    return new Promise<string>((resolve, reject) => {
      auth.loadURL(this.provider.generateAuthUrl({ scope: scopes }));
      const onclosed = () => reject('Interaction ended intentionally');
      auth.on('close', onclosed);
      auth.on('page-title-updated', ev => {
        const url = new URL(ev.sender.getURL());
        if (url.searchParams.get('approvalCode')) {
          auth.removeListener('close', onclosed);
          auth.close();
          return resolve(url.searchParams.get('approvalCode'));
        }
        if ((url.searchParams.get('response') || '').startsWith('error=')) {
          auth.removeListener('close', onclosed);
          auth.close();
          return reject(url.searchParams.get('response'));
        }
      });
    });
  }

  getTokens(code: string): Promise<GetTokenResponse> {
    return this.provider.getToken(code);
  }

}
