export const secrets = {
  YOUTUBE_API_KEY: 'This is a client API key, not related to each user. TODO: Make OAuth app',
  OAUTH_CLIENT: {
    client_id: '0123456789-xxxxxxxxxxxxx.apps.googleusercontent.com',
    client_secret: 'X-123-zzzzzzzzzzz',
    project_id: 'tube-vj',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    redirect_uris: [
      'urn:ietf:wg:oauth:2.0:oob',
      'http://localhost'
    ]
  }
};
