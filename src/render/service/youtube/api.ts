import { Injectable, Output, EventEmitter } from '@angular/core';
import { YouTubeSearchResponse } from '../../../models/youtube';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ipcRenderer } from '../../../models/electron';

declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class YouTubeDataAPIService {

  // YAGNI: No need to be observable
  // @Output() response: EventEmitter<YouTubeSearchResponse> = new EventEmitter();

  @Output() authenticated: EventEmitter<any> = new EventEmitter();

  accessToken = environment.YOUTUBE_API_KEY;
  refreshToken: string;
  tokenType: string;

  ipc: ipcRenderer;

  constructor(private http: HttpClient) {
    this.ipc = window.ipcRenderer;
    this.ipc.on('auth-success', (ev, tokens) => {
      this.accessToken = tokens.access_token;
      this.refreshToken = tokens.refresh_token;
      this.tokenType = tokens.token_type;
      this.authenticated.emit(this);
    });
  }

  authenticate() {
    this.ipc.send('auth-start', {});
  }

  search(query: string = '') {
    if (!query) { return; }
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('q', query.trim());
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('maxResults', '40');
    url.searchParams.set('type', 'video');
    url.searchParams.set('videoEmbeddable', 'true');
    let headers = {};
    if (this.tokenType) {
      headers = { Authorization: `${this.tokenType} ${this.accessToken}` };
    } else {
      url.searchParams.set('key', this.accessToken);
    }
    return this.http.get<YouTubeSearchResponse>(url.toString(), { headers });
  }

}
